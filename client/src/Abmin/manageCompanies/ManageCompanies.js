import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { getAuthUser } from "../../Storage/Storage";
import axios from "axios";

const ManageCompanies = () => {
  const token = getAuthUser().token;
  const [companies, setcompanies] = useState([]);
  const [changeOccurs, setChange] = useState("");

  const handleDelete = async (companyID) => {
    try {
      console.log(companyID);
      const res = await axios.delete(
        `http://localhost:5002/api/companies/6635815b437a258b45b637fe${companyID}`,
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
    }
    setChange(companyID);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log(token);
        const res = await axios.get("http://localhost:5002/api/companies", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        if (res?.data) setcompanies(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token || changeOccurs) fetch();
  }, [token, changeOccurs]);

  return (
    <div className="manage-company p5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center">Manage companies</h3>
        <Link to={"./AddCompany"} className="btn btn-success">
          Add New company
        </Link>
      </div>
      <Table striped bordered hover size="5m">
        <thead>
          <tr>
           
            <th>Position</th>
            <th>Description</th>
            <th>Offer</th>
            <th>Max Candidate Number</th>
            <th>Image</th>
            <th>Qualification</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {companies?.map((company) => (
            <tr key={company.id} id={company.id}>
              <td>{company.id}</td>
              <td>{company.position}</td>
              <td>{company.description}</td>
              <td>{company.offer}</td>
              <td>{company.max_candidate_number}</td>
              <td>{company.image_url}</td>
              <td>{company.qualification}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(company.id);
                  }}
                >
                  Remove
                </button>
                <Link to={" " + company.id} className="btn btn-sm btn-primary mx-2">
                  update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </div>
  );
};

export default ManageCompanies;
