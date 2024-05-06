import React, { useState } from "react";
import axios from "axios";
import { setAuthUser } from "../../Storage/Storage";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });
  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
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
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
        console.log(errors);
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

      <div className="submit">
        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Login;
