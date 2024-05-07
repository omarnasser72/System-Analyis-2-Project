import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const UpdateCompany = () => {
  const { id } = useParams();
  const [fetchedCompany, setFetchedCompany] = useState({});
  const [company, setCompany] = useState({
    loading: false,
    err: null,
  });
  const [currCompany, setCurrCompany] = useState({});
  const [justUpdated, setJustUpdated] = useState(false);
  const [error, setError] = useState(false);

  const fetchCompany = async () => {
    try {
      const res = await axios.get(`http://localhost:5002/api/companies/${id}`);
      console.log(res?.data?.data);
      setFetchedCompany(res?.data?.data);
      setCurrCompany(res?.data?.data);
    } catch (error) {
      setCompany({ ...company, err: "Company service is down" });
      console.error("Error fetching company:", error);
      setError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, []);

  useEffect(() => {
    fetchCompany();
    console.log(fetchedCompany);
  }, [id]);

  useEffect(() => {
    fetchCompany();
  }, [company]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5002/api/companies/${id}`,
        currCompany
      );
      console.log(res);
      if (res?.data) {
        setFetchedCompany(res.data);
        setJustUpdated(true);
        setCompany({ ...company, success: true });
      }
    } catch (error) {
      setCompany({ ...company, err: "Company service is down" });
      console.error("Error updating company:", error);
      setError(true);
    }
  };

  return (
    <div className="login-container" style={{ minHeight: "60vh" }}>
      <h1>Update Company</h1>
      {company?.err && (
        <Alert variant="danger" className="p-2" style={{ width: "fitContent" }}>
          {company?.err}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        {fetchedCompany &&
          Object.keys(fetchedCompany).map((key) =>
            key === "__v" ||
            key === "_id" ||
            key === "createdAt" ||
            key === "updatedAt" ? (
              <></>
            ) : (
              <>
                <Form.Group className="mb-5" key={key}>
                  <label>
                    {key}
                    {" :"}
                  </label>
                  <textarea
                    className="form-control w-50"
                    rows={1}
                    placeholder={key}
                    value={currCompany[key]}
                    onChange={(e) =>
                      setCurrCompany({ ...currCompany, [key]: e.target.value })
                    }
                    id={key}
                  ></textarea>
                </Form.Group>
              </>
            )
          )}
        <button type="submit" className="btn btn-dark">
          Update Company
        </button>
      </Form>
      {justUpdated && (
        <div
          style={{
            backgroundColor: "rgb(174, 255, 137)",
            padding: "20px",
            fontWeight: "600",
            margin: "20px",
            width: "fit-content",
          }}
          onClick={() => setJustUpdated(false)}
        >
          Company Updated successfully
        </div>
      )}
      {error && !company?.err && (
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

export default UpdateCompany;
