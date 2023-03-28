import React from "react";
import "../styles/SignUp.css";

function SignUp() {
  return (
    <div className="container">
      <p className="heading-text">User Signup</p>
      <p className="heading-subtext">Sign up</p>
      <input
        type="text"
        name="username"
        id=""
        className="input"
        placeholder="User Name"
      />
      <input
        type="email"
        name="username"
        id=""
        className="input"
        placeholder="Email Address"
      />
      <input
        type="password"
        name="password"
        id=""
        className="input"
        placeholder="Password"
      />
      <input type="button" value="Sign Up" className="submit-btn" />
    </div>
  );
}

export default SignUp;
