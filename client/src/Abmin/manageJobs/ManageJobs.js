import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./GetUser";
import { getAuthUser } from "../../Storage/Storage";
import axios from "axios";
import { Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";

const ManageJobs = () => {
  const token = getAuthUser().token;
  const [jobs, setjobs] = useState([]);
  const [changeOccurs, setChange] = useState("");
  const [jobServiceIsDown, setJobServiceIsDown] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (jobId) => {
    setLoading(true);
    try {
      console.log(jobId);
      const res = await axios.delete(
        `http://localhost:7878/api/jobs/${jobId}`,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setChange(jobId);
  };

  const fetch = async () => {
    try {
      setLoading(true);
      console.log(token);
      const res = await axios.get("http://localhost:7878/api/jobs/", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (res?.data) setjobs(res.data);
      else setJobServiceIsDown(true);
      setLoading(false);
    } catch (error) {
      setJobServiceIsDown(true);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token || changeOccurs) fetch();
  }, [token, changeOccurs]);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    <div className="manage-job p5" style={{ minHeight: "60vh" }}>
      {loading === true && (
        <div className="text-center" style={{ marginTop: "10%" }}>
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {!jobServiceIsDown && loading === false && jobs.length > 0 && (
        <>
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
                <th>Image</th>
                <th>Qualification</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs?.map((job) => (
                <tr key={job._id} id={job._id}>
                  <td>{job._id}</td>
                  <td>{job.position}</td>
                  <td>{job.description}</td>
                  <td>{job.offer}</td>
                  <td>{job.image_url}</td>
                  <td>{job.qualification}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger mx-1"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(job._id);
                      }}
                    >
                      Remove
                    </button>
                    <Link to={job._id} className="btn btn-sm btn-primary mx-2">
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
        </>
      )}

      {jobServiceIsDown && (
        <Alert variant="danger" className="p-2" style={{ margin: "5%" }}>
          Job service is down, please try again later !
        </Alert>
      )}
    </div>
  );
};

export default ManageJobs;
