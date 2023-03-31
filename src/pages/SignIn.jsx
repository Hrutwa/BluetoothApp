import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Sign.css";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";

function SignIn() {
  const User = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const onChange = (event) => {
    const newData = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: newData,
    });
  };
  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        User.setAuthUser(userCredential);
        toast.success("Successfully Logged In!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Incorrect Email/Password!");
      });
  };
  return (
    <>
      <div className="container">
        <p className="heading-text">Bluetooth App</p>
        <p className="heading-subtext">Login</p>
        <form onSubmit={signIn} className="form-container">
          <input
            type="email"
            name="email"
            value={formData.email}
            className="input"
            autoComplete="off"
            onChange={onChange}
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            className="input"
            onChange={onChange}
            placeholder="Password"
          />
          <input type="submit" value="Login" className="submit-btn" />
        </form>
        <p>
          Don't have an account? <Link to={"/signUp"}>Sign Up</Link>
        </p>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default SignIn;
