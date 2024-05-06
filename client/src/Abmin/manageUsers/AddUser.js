import axios from "axios";
import React, { useEffect, useState } from "react";
//import { Form } from 'react-router-dom';
import Form from "react-bootstrap/Form";
const AddUser = () => {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({});
  const [emailExists, setEmailExists] = useState(false);
  const userToken = localStorage
    .getItem("user")
    .split("token")[1]
    .split(`":"`)[1]
    .split(`"`)[0];

  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    console.log(info);
  }, [info]);

  useEffect(() => {
    console.log(emailExists);
  }, [emailExists]);

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  const handleChange = (e) => {
    if (e.target.id === "email") setEmailExists(false);
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/create-user", info, {
        headers: {
          "Content-Type": "application/json",
          token: userToken,
        },
      });
      console.log(res);

      if (res?.data) setJustAdded(true);
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timeout);
    } catch (error) {
      if (error?.response?.data?.errMsg === "email already exists") {
        setEmailExists(true);
      }
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <h1> Add new User</h1>
      <Form>
        {/* <Form.Group className="mb-3">
          <textarea
            className="form-control  w-50"
            rows={1}
            placeholder="ID"
          ></textarea>
        </Form.Group> */}
        <Form.Group className="mb-3">
          <textarea
            id="firstName"
            className="form-control  w-50"
            rows={1}
            placeholder="first name"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="lastName"
            className="form-control  w-50"
            rows={1}
            placeholder="last name"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="email"
            className="form-control  w-50 "
            rows={1}
            placeholder="Email"
            onChange={handleChange}
          ></textarea>
          {emailExists && <p style={{ color: "red" }}>email exists</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="password"
            className="form-control  w-50 "
            rows={1}
            placeholder="Password"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="phone"
            className="form-control w-50"
            rows={1}
            placeholder="PhoneNumber"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="skill"
            className="form-control  w-50"
            rows={1}
            placeholder="skills"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="aboutYou"
            className="form-control  w-50"
            rows={1}
            placeholder="about you"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        {/* <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="Status"
          ></textarea>
        </Form.Group> */}
        {/* <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="Type"
          ></textarea>
        </Form.Group> */}
        {/* <Form.Group>
          <input type="file" className="form-control w-50" />
        </Form.Group> */}

        <button
          onClick={handleClick}
          className="btn btn-dark w-20 "
          variant="primary"
          type="submit"
        >
          Add
        </button>
      </Form>
      {justAdded && (
        <div
          style={{
            backgroundColor: "rgb(174, 255, 137)",
            padding: "20px",
            fontWeight: "600",
            margin: "20px",
            width: "fit-content",
          }}
          onClick={() => setJustAdded(false)}
        >
          User added successfully
        </div>
      )}
      {error && (
        <div
          style={{
            backgroundColor: "rgb(255, 171, 171)",
            padding: "20px",
            fontWeight: "600",
            margin: "20px",
            width: "fit-content",
          }}
          onClick={() => setError(false)}
        >
          something went wrong
        </div>
      )}
    </div>
  );
};

export default AddUser;
