import React, { useState } from "react";
import "./signup.css";
import axios from "axios";
import { setAuthUser } from "../../Storage/Storage";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({
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
  const [authServiceIsDown, setAuthServiceIsDown] = useState(false);

  const SignupFun = (e) => {
    e.preventDefault();
    setSignup({ ...signup, loading: true, err: [] });
    axios
      .post("http://localhost:8080/api/auth/register", {
        email: signup.email,
        password: signup.password,
        firstName: signup.firstName,
        lastName: signup.lastName,
        phone: signup.phone,
        aboutYou: signup.aboutYou,
        skill: signup.skill,
      })
      .then((resp) => {
        setSignup({ ...signup, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/login");
      })
      .catch((errors) => {
        setSignup({
          ...signup,
          loading: false,
          err: errors?.response?.data?.errors,
        });
        setAuthServiceIsDown(true);
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
          value={signup.firstName}
          onChange={(e) => setSignup({ ...signup, firstName: e.target.value })}
        />
      </div>

      <div className="last-name">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          value={signup.lastName}
          onChange={(e) => setSignup({ ...signup, lastName: e.target.value })}
        />
      </div>

      <div className="emailAddress">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={signup.email}
          onChange={(e) => setSignup({ ...signup, email: e.target.value })}
        />
      </div>

      <div className="password">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={signup.password}
          onChange={(e) => setSignup({ ...signup, password: e.target.value })}
        />
      </div>
      <div className="number">
        <label>PhoneNumber</label>
        <input
          type="Phone Number"
          className="form-control"
          placeholder="Enter Your Phone Number"
          value={signup.phone}
          onChange={(e) => setSignup({ ...signup, phone: e.target.value })}
        />
      </div>
      <div className="skills">
        <label>skills</label>
        <input
          type="Text"
          className="form-control"
          placeholder="Enter  Your skills"
          value={signup.skill}
          onChange={(e) => setSignup({ ...signup, skill: e.target.value })}
        />
      </div>
      <div className="ABout you">
        <label>About You</label>
        <input
          type="Text"
          className="form-control"
          placeholder="Describe yourself"
          value={signup.aboutYou}
          onChange={(e) => setSignup({ ...signup, aboutYou: e.target.value })}
        />
      </div>

      {signup?.loading === false && (
        <>
          <div className="submit">
            <button type="submit" className="btn btn-dark ">
              Sign Up
            </button>
          </div>
          <p className="forgot-password ">
            Already registered <a href="/Login">Log in?</a>
          </p>
        </>
      )}
      {signup?.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {authServiceIsDown && (
        <div className="serviceDown">Authentication service is down</div>
      )}
    </form>
  );
};

export default Signup;
