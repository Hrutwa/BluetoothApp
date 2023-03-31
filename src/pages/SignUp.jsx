import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sign.css";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (event) => {
    const newData = event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: newData,
    });
  };
  const signUp = (event) => {
    event.preventDefault();
    if (formData.password === formData.confirmPassword) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          toast.success("Successfully Created!");
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });
        })
        .catch((error) => {
          toast.error("Try again a different email");
        });
    } else {
      toast.error("Password's don't match!");
    }
  };
  return (
    <>
      <div className="container">
        <p className="heading-text">Bluetooth App</p>
        <p className="heading-subtext">Create an account</p>
        <form onSubmit={signUp} className="form-container">
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
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            className="input"
            onChange={onChange}
            placeholder="Confirm Password"
          />
          <input type="submit" value="Sign Up" className="submit-btn" />
        </form>
        <p>
          Already have an account? <Link to={"/signIn"}>Sign In</Link>
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

export default SignUp;
