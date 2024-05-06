import React, { useState } from "react";
import axios from "axios";
import { setAuthUser } from "../../Storage/Storage";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";
const ContactUs = () => {
  const navigate = useNavigate();
  const [ContactUs, setContactUs] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });
  const ContactUsFun = (e) => {
    e.preventDefault();
    setContactUs({ ...ContactUs, loading: true, err: [] });
    axios
      .post("http://localhost:5001/api/", {
        email: ContactUs.email,
        password: ContactUs.password,
      })

      .then((resp) => {
        console.log(resp);
        setContactUs({ ...ContactUs, loading: false, err: [] });
        setAuthUser(resp.data.user);
        navigate("/");
      })
      .catch((errors) => {
        setContactUs({
          ...ContactUs,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <>
    <form className="form" onSubmit={ContactUsFun}></form>
      <h2>We always here to help you </h2>
      <div className="email">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={ContactUs.email}
          onChange={(e) => setContactUs({ ...ContactUs, email: e.target.value })}
        />
      </div>
      <div className="ABout you">
        <label>About You</label>
        <input
          type="Text"
          className="form-control"
          placeholder="Describe yourself"
          value={ContactUs.message}
          onChange={(e) => setContactUs({ ...ContactUs, messazzzzzzzzzzge: e.target.value })}
        />
      </div>
    </>
  );
};

export default ContactUs;
