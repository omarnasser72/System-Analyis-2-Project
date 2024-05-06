import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { setAuthUser } from "../../Storage/Storage";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [Signup, setSignup] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    aboutYou: "",
    skill: "",
    loading: false,
    err: [],
  });

  const SignupFun = (e) => {
    e.preventDefault();
    setSignup({ ...Signup, loading: true, err: [] });
    axios
      .post("http://localhost:8080/api/auth/register", {
        email: Signup.email,
        password: Signup.password,
        firstName: Signup.firstName,
        lastName: Signup.lastName,
        phone: Signup.phone,
        aboutYou: Signup.aboutYou,
        skill: Signup.skill,
      })
      .then((resp) => {
        setSignup({ ...Signup, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/login");
      })
      .catch((errors) => {
        setSignup({
          ...Signup,
          loading: false,
          err: errors.response.data.errors,
        });
        console.log(errors);
      });
  };
  return (
    <form className="form" onSubmit={SignupFun}>
      <h2>Sign Up</h2>

      <div className="first-name">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          value={Signup.firstName}
          onChange={(e) => setSignup({ ...Signup, firstName: e.target.value })}
        />
      </div>

      <div className="last-name">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={Signup.lastName}
          onChange={(e) => setSignup({ ...Signup, lastName: e.target.value })}
        />
      </div>

      <div className="email">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={Signup.email}
          onChange={(e) => setSignup({ ...Signup, email: e.target.value })}
        />
      </div>

      <div className="password">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={Signup.password}
          onChange={(e) => setSignup({ ...Signup, password: e.target.value })}
        />
      </div>
      <div className="number">
        <label>PhoneNumber</label>
        <input
          type="Phone Number"
          className="form-control"
          placeholder="Enter Your Phone Number"
          value={Signup.phone}
          onChange={(e) => setSignup({ ...Signup, phone: e.target.value })}
        />
      </div>
      <div className="skills">
        <label>skills</label>
        <input
          type="Text"
          className="form-control"
          placeholder="Enter  Your skills"
          value={Signup.skill}
          onChange={(e) => setSignup({ ...Signup, skill: e.target.value })}
        />
      </div>
      <div className="ABout you">
        <label>About You</label>
        <input
          type="Text"
          className="form-control"
          placeholder="Describe yourself"
          value={Signup.aboutYou}
          onChange={(e) => setSignup({ ...Signup, aboutYou: e.target.value })}
        />
      </div>

      <div className="submit">
        <button type="submit" className="btn btn-dark ">
          Sign Up
        </button>
      </div>
      <p className="forgot-password ">
        Already registered <a href="/Login">Log in?</a>
      </p>
    </form>
  );
};

export default Signup;
