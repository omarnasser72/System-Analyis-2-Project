import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import "./GetUser";
import { getAuthUser } from "../../Storage/Storage";
import axios from "axios";

const ManageJobs = () => {
  const token = getAuthUser().token;
  const [jobs, setjobs] = useState([]);
  const [changeOccurs, setChange] = useState("");

  const handleDelete = async (jobId) => {
    try {
      console.log(jobId);
      const res = await axios.delete(
        `http://localhost:7878/api/jobs/66340d12314a034b8c4a80b7${jobId}`,
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
    setChange(jobId);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log(token);
        const res = await axios.get("http://localhost:7878/api/jobs/", {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        });
        if (res?.data) setjobs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (token || changeOccurs) fetch();
  }, [token, changeOccurs]);

  return (
    <div className="manage-job p5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center">Manage Jobs</h3>
        <Link to={"./AddJob"} className="btn btn-success">
          Add New Job
        </Link>
      </div>
      <Table striped bordered hover size="5m">
        <thead>
          <tr>
            <th>ID</th>
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
          {jobs?.map((job) => (
            <tr key={job.id} id={job.id}>
              <td>{job.id}</td>
              <td>{job.position}</td>
              <td>{job.description}</td>
              <td>{job.offer}</td>
              <td>{job.max_candidate_number}</td>
              <td>{job.image_url}</td>
              <td>{job.qualification}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(job.id);
                  }}
                >
                  Remove
                </button>
                <Link to={" " + job.id} className="btn btn-sm btn-primary mx-2">
                  update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to={"GetUser"} className="btn btn-sm btn-primary mx-2">
        Users Apllied
      </Link>
    </div>
  );
};

export default ManageJobs;
