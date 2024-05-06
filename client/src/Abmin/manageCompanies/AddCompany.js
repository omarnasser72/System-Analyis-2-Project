import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const AddCompany = () => {
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({});
  const [nameExists, setNameExists] = useState(false); // State to check if name already exists

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/api/Addcompanies", info);
      console.log(res);
      // Handle success scenario
    } catch (error) {
      // Handle error scenario
      if (error?.response?.data?.errMsg === "company name already exists") {
        setNameExists(true);
      }
      console.error(error);
      setError(true);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "name") setNameExists(false); // Reset nameExists if name field changes
    setInfo({ ...info, [e.target.id]: e.target.value });
  };

  return (
    <div className="login-container">
      <h1>Add new Company</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <textarea
            id="name"
            className="form-control w-50"
            rows={1}
            placeholder="Company Name"
            onChange={handleChange}
          ></textarea>
          {nameExists && <p style={{ color: "red" }}>Company name already exists</p>}
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="info"
            className="form-control w-50"
            rows={3}
            placeholder="Company Information"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <Form.Group className="mb-3">
          <textarea
            id="major"
            className="form-control w-50"
            rows={1}
            placeholder="Company Major"
            onChange={handleChange}
          ></textarea>
        </Form.Group>
        <button className="btn btn-dark w-20" type="submit">
          Add Company
        </button>
      </Form>
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
          Something went wrong
        </div>
      )}
    </div>
  );
};

export default AddCompany;
