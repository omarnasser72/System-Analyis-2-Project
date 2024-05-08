import React, { useState } from "react";
import axios from "axios";
import { setAuthUser } from "../../Storage/Storage";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Spinner from "react-bootstrap/Spinner";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: null,
  });
  const [emailOrPassNotFound, setEmailOrPassNotFound] = useState(false);
  const [authServiceIsDown, setAuthServiceIsDown] = useState(false);

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: null });
    axios
      .post("http://localhost:8080/api/auth/login", {
        email: login.email,
        password: login.password,
      })

      .then((resp) => {
        //console.log(resp?.data);
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp?.data);
        navigate("/");
      })
      .catch((error) => {
        if (
          error?.response?.data?.message === "Email or Password is Incorrect"
        ) {
          setEmailOrPassNotFound(true);
          setLogin({
            ...login,
            loading: false,
            err: error?.response?.data?.message,
          });
        } else {
          setLogin({
            ...login,
            loading: false,
            err:
              "Authentication service is down" ||
              error?.response?.data?.message,
          });
          setAuthServiceIsDown(true);
        }
        console.log(error);
      });
  };
  return (
    <form className="form" onSubmit={LoginFun}>
      <h2>Log In</h2>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={login.email}
          onChange={(e) => setLogin({ ...login, email: e.target.value })}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={login.password}
          onChange={(e) => setLogin({ ...login, password: e.target.value })}
        />
      </div>

      {login.loading === false && (
        <div className="submit">
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      )}
      {login?.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {emailOrPassNotFound && (
        <div className="emailOrPassNotFound">
          Email or Password is Incorrect
        </div>
      )}
      {authServiceIsDown && emailOrPassNotFound !== true && (
        <div className="serviceDown">Authentication service is down</div>
      )}
    </form>
  );
};
export default Login;
