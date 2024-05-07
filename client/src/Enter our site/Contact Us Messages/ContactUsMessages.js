import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUsMessages.css";
import { Table, Alert } from "react-bootstrap";

const ContactUs = () => {
  const [contactUsMessages, setContactUsMessages] = useState({
    results: [],
    loading: true,
    err: null,
  });

  const fetchMessages = async () => {
    await axios
      .get("http://localhost:5001/api/contact/")
      .then((resp) => {
        console.log(resp);
        setContactUsMessages({
          results: resp?.data?.data,
          loading: false,
          err: null,
        });
      })
      .catch((errors) => {
        setContactUsMessages({
          results: [],
          loading: false,
          err: "Contact us service is down",
        });
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="contactUsMessages p5" style={{ minHeight: "60vh" }}>
      {!contactUsMessages?.err && (
        <>
          <div className="header d-flex justify-content-between mb-5">
            <h3 className="text-center">Contact-Us Messages</h3>
          </div>
          <Table striped bordered hover size="5m">
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contactUsMessages?.results?.map((contactUsMesssage) => (
                <tr key={contactUsMesssage._id} id={contactUsMesssage._id}>
                  <td>{contactUsMesssage._id}</td>
                  <td>{contactUsMesssage.email}</td>
                  <td>{contactUsMesssage.feedback}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {contactUsMessages?.err && (
        <Alert variant="danger" className="p-2" style={{ margin: "5%" }}>
          {contactUsMessages?.err}
        </Alert>
      )}
    </div>
  );
};

export default ContactUs;
