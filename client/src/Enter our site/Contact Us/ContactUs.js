import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const ContactUs = () => {
  const navigate = useNavigate();
  const [contactUs, setContactUs] = useState({
    email: "",
    feedback: "",
    loading: false,
    err: null,
  });
  const ContactUsFun = async (e) => {
    e.preventDefault();
    setContactUs({ ...contactUs, loading: true });
    await axios
      .post("http://localhost:5001/api/contact/send", {
        email: contactUs.email,
        feedback: contactUs.feedback,
      })
      .then((resp) => {
        console.log(resp);
        setContactUs({ ...contactUs, loading: false, err: null });
      })
      .catch((errors) => {
        setContactUs({
          ...contactUs,
          loading: false,
          err: "Contact us service is down",
        });
      });
  };
  return (
    <div className="contactUs" style={{ minHeight: "60vh" }}>
      {contactUs?.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {!contactUs?.err || !contactUs?.loading ? (
        <form className="form" onSubmit={ContactUsFun}>
          <h2>We always here to help you </h2>
          <div className="email">
            <label>Email address: </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={contactUs.email}
              onChange={(e) =>
                setContactUs({ ...contactUs, email: e.target.value })
              }
            />
          </div>
          <div className="messsage">
            <label>Message: </label>
            <input
              type="Text"
              className="form-control"
              placeholder="Leave a message"
              value={contactUs.message}
              onChange={(e) =>
                setContactUs({ ...contactUs, feedback: e.target.value })
              }
            />
          </div>
          <div className="submit">
            <button
              type="submit"
              className="btn btn-dark"
              style={{ margin: "0", marginTop: "30%" }}
            >
              Submit
            </button>
          </div>
        </form>
      ) : (
        <Alert variant="danger" className="p-2" style={{ margin: "5%" }}>
          {contactUs?.err}
        </Alert>
      )}
    </div>
  );
};

export default ContactUs;
