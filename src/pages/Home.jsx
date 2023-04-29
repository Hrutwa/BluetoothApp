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

    data += "\n";

    if (data.length > 20) {
      let chunks = data.match(/(.|[\r\n]){1,20}/g);

      writeToCharacteristic(characteristicCache, chunks[0]);

      for (let i = 1; i < chunks.length; i++) {
        setTimeout(() => {
          writeToCharacteristic(characteristicCache, chunks[i]);
        }, i * 100);
      }
    } else {
      writeToCharacteristic(characteristicCache, data);
    }
  }
  function writeToCharacteristic(characteristic, data) {
    characteristic.writeValue(new TextEncoder().encode(data));
  }
  return (
    <>
      <div>
        {User.authUser && <button onClick={User.userSignOut}>Sign Out</button>}
      </div>
      <button className="btn" onClick={connectClick}>
        Connect
      </button>
      <br />
      {deviceCache && (
        <button className="btn" onClick={disconnectClick}>
          Disconnect
        </button>
      )}
      {deviceCache && (
        <button className="btn" value={1} onClick={handleClick}>
          Turn on Bike
        </button>
      )}
      {deviceCache && (
        <button className="btn" value={2} onClick={handleClick}>
          Start Engine
        </button>
      )}
      {deviceCache && (
        <button className="btn" value={0} onClick={handleClick}>
          Turn Off Engine
        </button>
      )}
    </>
  );
}

export default Home;
