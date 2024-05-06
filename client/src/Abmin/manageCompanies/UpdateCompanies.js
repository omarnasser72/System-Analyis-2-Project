import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const UpdateCompany = () => {
  const { id } = useParams();
  const [company, setCompany] = useState({});
  const [updatedCompany, setUpdatedCompany] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/companies/${id}`);
        setCompany(response.data);
        setUpdatedCompany(response.data);
      } catch (error) {
        console.error("Error fetching company:", error);
        setError(true);
      }
    };
    fetchCompany();
  }, [id]);

  const handleChange = (e) => {
    setUpdatedCompany({ ...updatedCompany, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5002/api/companies/${id}`, updatedCompany);
      console.log(response);
      setSuccess(true);
    } catch (error) {
      console.error("Error updating company:", error);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <h1>Update Company</h1>
      {error && (
        <Alert variant="danger" className="p-2">
          Something went wrong. Please try again later.
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="p-2">
          Company updated successfully.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {Object.keys(company).map((key) => (
          <Form.Group className="mb-5" key={key}>
            <label>
              {key}
              {" :"}
            </label>
            <textarea
              className="form-control w-50"
              rows={1}
              placeholder={key}
              value={updatedCompany[key] || ""}
              onChange={handleChange}
              id={key}
            ></textarea>
          </Form.Group>
        ))}
        <button type="submit" className="btn btn-dark">
          Update Company
        </button>
      </Form>
    </div>
  );
};

export default UpdateCompany;
