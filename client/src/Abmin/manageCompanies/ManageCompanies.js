import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../Storage/Storage";
import axios from "axios";

const ManageCompanies = () => {
  const token = getAuthUser().token;
  const [companies, setCompanies] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const [changeOccurs, setChange] = useState("");

  const handleDelete = async (companyID) => {
    try {
      console.log(companyID);
      const res = await axios.delete(
        `http://localhost:5002/api/companies/${companyID}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
      setCompanies({
        ...companies,
        loading: false,
        err: error?.response?.data || "something went wrong in deletion",
      });
    }
    setChange(companyID);
  };

  const fetch = async () => {
    try {
      console.log(token);
      const res = await axios.get("http://localhost:5002/api/companies", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (res?.data?.data)
        setCompanies({ results: res.data.data, loading: false, err: null });
    } catch (error) {
      setCompanies({
        ...companies,
        loading: false,
        err: "Company service is down, please try again later ! ",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (changeOccurs) fetch();
  }, [changeOccurs]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(companies);
  }, [companies]);

  return (
    <div className="manage-company p5" style={{ minHeight: "60vh" }}>
      {companies?.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {companies?.loading === false && companies?.err === null && (
        <div className="header d-flex justify-content-between mb-5">
          <h3 className="text-center">Manage companies</h3>
          <Link to={"./AddCompany"} className="btn btn-success">
            Add New company
          </Link>
        </div>
      )}
      {companies?.loading === false &&
        companies?.err === null &&
        companies?.results?.length > 0 && (
          <>
            <Table striped bordered hover size="5m">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Info</th>
                  <th>major</th>
                </tr>
              </thead>
              <tbody>
                {companies?.results?.map((company) => (
                  <tr key={company._id} id={company._id}>
                    <td>{company.name}</td>
                    <td>{company.info}</td>
                    <td>{company.major}</td>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(company._id);
                      }}
                    >
                      Remove
                    </button>
                    <Link
                      to={company._id}
                      className="btn btn-sm btn-primary mx-2"
                    >
                      update
                    </Link>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      {companies?.loading === false && companies?.err !== null && (
        <Alert variant="danger" className="p-2" style={{ margin: "10%" }}>
          {companies?.err}
        </Alert>
      )}
      {companies?.loading === false &&
        companies?.err === null &&
        companies?.results?.length === 0 && (
          <Alert variant="info" className="p-2" style={{ margin: "10%" }}>
            No Companies exist !
          </Alert>
        )}
    </div>
  );
};

export default ManageCompanies;
