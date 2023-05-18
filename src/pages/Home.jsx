import React, { useContext, useState } from "react";
import "../styles/Home.css";
import { auth } from "../utils/firebase";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

function Home() {
  const [deviceCache, setdeviceCache] = useState(null);
  const [characteristicCache, setcharacteristicCache] = useState(null);
  const User = useContext(UserContext);
  const navigate = useNavigate();
  //Disconnect Event handler
  const connectClick = () => {
    connect();
  };
  //Disconnect Event handler
  const disconnectClick = () => {
    disconnect();
  };
  //Receive response Event handler
  const handleClick = (e) => {
    send(e.target.value);
  };

  // Launch Bluetooth device chooser and connect to the selected
  function connect() {
    return (
      (deviceCache ? Promise.resolve(deviceCache) : requestBluetoothDevice())
        .then((device) => connectDeviceAndCacheCharacteristic(device))
        // .then((characteristic) => startNotifications(characteristic))
        .catch((error) => console.log(error))
    );
  }
  //Function that scans available devices
  function requestBluetoothDevice() {
    console.log("Requesting bluetooth device...");
    return navigator.bluetooth
      .requestDevice({
        filters: [{ services: [0xffe0] }],
      })
      .then((device) => {
        console.log('"' + device.name + '" bluetooth device selected');
        setdeviceCache(device);

        return deviceCache;
      });
  }

  // Connect to the device specified, get service and characteristic
  function connectDeviceAndCacheCharacteristic(device) {
    if (device.gatt.connected && characteristicCache) {
      return Promise.resolve(characteristicCache);
    }

    console.log("Connecting to GATT server...");

    return device.gatt
      .connect()
      .then((server) => {
        console.log("GATT server connected, getting service...");

        return server.getPrimaryService(0xffe0);
      })
      .then((service) => {
        console.log("Service found, getting characteristic...");

        return service.getCharacteristic(0xffe1);
      })
      .then((characteristic) => {
        console.log("Characteristic found");
        setcharacteristicCache(characteristic);

        return characteristicCache;
      });
  }
  //Disconnect Device
  function disconnect() {
    if (deviceCache) {
      console.log(
        'Disconnecting from "' + deviceCache.name + '" bluetooth device...'
      );

      if (deviceCache.gatt.connected) {
        deviceCache.gatt.disconnect();
        console.log('"' + deviceCache.name + '" bluetooth device disconnected');
      } else {
        console.log(
          '"' + deviceCache.name + '" bluetooth device is already disconnected'
        );
      }
    }

    setcharacteristicCache(null);
    setdeviceCache(null);
  }
  //Send data to controller
  function send(data) {
    data = String(data);
  
    if (!data || !characteristicCache) {
      return;
    }
  
    setTimeout(() => {
      writeToCharacteristic(characteristicCache, data);
    }, 100);
  }
  function writeToCharacteristic(characteristic, data) {
    characteristic.writeValue(new TextEncoder().encode(data));
  }
  return (
    <>
      <div>
      {User.authUser && (
        <button 
          className="btn" 
          style={{ 
          marginBottom: "0px", 
          color: "#A97142", 
          width: "120px",
      }} 
      onClick={User.userSignOut}
      >
      <span class="material-icons" style={{ verticalAlign: "middle" }}>logout</span>
      <span style={{ verticalAlign: "middle" }}>Sign Out</span>
      </button>
      )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "110vh" }}>
      <button className="btn" style={{ marginBottom: "0px", color: "#4EE2EC", width: "200px" }} value={0} onClick={connectClick}>
          <span class="material-icons" style={{ verticalAlign: "middle" }}>bluetooth</span>
          <span style={{ verticalAlign: "middle" }}>Connect Bluetooth</span>
        </button>
        <br />
        {deviceCache && (
          <button className="btn" style={{ marginBottom: "0px", color: "#4E8975", width: "200px" }} value={0} onClick={disconnectClick}>
          <span class="material-icons" style={{ verticalAlign: "middle" }}>bluetooth_disabled</span>
          <span style={{ verticalAlign: "middle" }}>Disconnect Bluetooth</span>
        </button>
        )}
        <br />
        {deviceCache && (
          <button className="btn" style={{ marginBottom: "0px", color: "green", width: "200px" }} value={1} onClick={handleClick}>
          <span class="material-icons" style={{ verticalAlign: "middle" }}>power_settings_new</span>
          <span style={{ verticalAlign: "middle" }}>Ignition On</span>
        </button>
        )}
        <br />
        {deviceCache && (
          <button className="btn" style={{ marginBottom: "0px", color: "orange", width: "200px" }} value={2} onClick={handleClick}>
          <span class="material-icons" style={{ verticalAlign: "middle" }}>settings_suggest</span>
          <span style={{ verticalAlign: "middle" }}>Start Engine</span>
        </button>
        )}
        <br />
        {deviceCache && (
          <button className="btn" style={{ marginBottom: "0px", color: "red", width: "200px" }} value={0} onClick={handleClick}>
            <span class="material-icons" style={{ verticalAlign: "middle" }}>power_settings_new</span>
            <span style={{ verticalAlign: "middle" }}>Ignition Off</span>
          </button>
        )}
        <br />
        {deviceCache && (
        <button className="btn" style={{ marginBottom: "0px", color: "#E2F516", width: "200px" }} value={3} onClick={handleClick}>
        <span class="material-icons" style={{ verticalAlign: "middle" }}>notifications_active</span>
        <span style={{ verticalAlign: "middle" }}>Activate Sentry Mode</span>
        </button>
        )}
        <br />
        {deviceCache && (
        <button className="btn" style={{ marginBottom: "0px", color: "#808000", width: "200px" }} value={4} onClick={handleClick}>
        <span class="material-icons" style={{ verticalAlign: "middle" }}>notifications_off</span>
        <span style={{ verticalAlign: "middle" }}>Deativate Sentry Mode</span>
        </button>
        )}
      <br />
      </div>
    </>
  );
}

export default Home;
