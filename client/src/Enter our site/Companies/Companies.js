import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import CompanyCard from "./CompanyCard";

const Companies = () => {
  const [companies, setCompanies] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });
  const fetchCompanies = async () => {
    try {
      const res = await axios.get("http://localhost:5002/api/companies");
      if (res?.data?.data)
        setCompanies({
          ...companies,
          results: res?.data?.data,
          loading: false,
          err: null,
        });
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies({
        ...companies,
        loading: false,
        err:
          error?.response?.data?.message ||
          "Company service is down, please try again later ! ",
      });
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  return (
    <div className="companies-container p-5" style={{ minHeight: "60vh" }}>
      <h1>Companies</h1>
      {companies?.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {companies?.loading === false && companies?.err === null && (
        <div className="row">
          {companies?.results?.map((company) => (
            // <li key={company._id}>
            //   <h2>{company.name}</h2>
            //   <p>{company.info}</p>
            //   <p>{company.major}</p>
            //   <p>Created at: {new Date(company.createdAt).toLocaleString()}</p>
            //   {/* Assuming createdAt is part of your schema */}
            // </li>
            <div className="col-3 card-company-container" key={company._id}>
              <CompanyCard
                name={company.name}
                info={company.info}
                major={company.major}
              />
            </div>
          ))}
        </div>
      )}
      {companies.loading === false && companies.err !== null && (
        <Alert variant="danger" className="p-2">
          {companies.err}
        </Alert>
      )}
      {companies?.loading === false &&
        companies?.err === null &&
        companies?.results?.length === 0 && (
          <Alert variant="info" className="p-2">
            No companies, please try again later !
          </Alert>
        )}
    </div>
  );
};

export default Companies;
