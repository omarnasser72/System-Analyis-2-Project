import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Alert } from "react-bootstrap";

const AddCompany = () => {
  const [error, setError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [copmanyServiceIsDown, setCompanyServiceIsDown] = useState(false);

  const [company, setCompany] = useState({
    name: "",
    major: "",
    info: "",
    loading: false,
    err: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5002/api/Addcompanies",
        company
      );
      console.log(res);
      if (res?.data?.data) {
        setJustAdded(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else setCompanyServiceIsDown(true);
    } catch (error) {
      setCompany({
        ...company,
        loading: false,
        err: "Company service is down, please try again later ! ",
      });
      setCompanyServiceIsDown(true);
      console.log(error);
      if (!copmanyServiceIsDown || company?.err) setError(true);
    }
  };

  useEffect(() => {
    console.log("Company: ", company);
    console.log("error: ", true);
    console.log(company?.err);
  }, [company]);

  return (
    <div className="login-container" style={{ minHeight: "60vh" }}>
      <h1>Add new Company</h1>
      {company?.err && (
        <Alert
          variant="danger"
          className="p-2"
          style={{ width: "fit-content" }}
        >
          {company?.err}
        </Alert>
      )}
      {(!company?.err || !copmanyServiceIsDown) && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <textarea
              id="name"
              className="form-control w-50"
              rows={1}
              placeholder="Company Name"
              onChange={(e) => {
                setCompany({ ...company, name: e.target.value });
              }}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <textarea
              id="info"
              className="form-control w-50"
              rows={3}
              placeholder="Company Information"
              onChange={(e) => {
                setCompany({ ...company, info: e.target.value });
              }}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <textarea
              id="major"
              className="form-control w-50"
              rows={1}
              placeholder="Company Major"
              onChange={(e) => {
                setCompany({ ...company, major: e.target.value });
              }}
            ></textarea>
          </Form.Group>
          <button className="btn btn-dark w-20" type="submit">
            Add Company
          </button>
        </Form>
      )}
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
          Company added successfully
        </div>
      )}
      {!company?.err && error && (
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
