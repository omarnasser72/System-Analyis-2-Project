import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../Storage/Storage";

const GetUser = () => {
  const token = getAuthUser().token;
  console.log(token);
  const [requestedJobs, setRequestedJobs] = useState([]);

  const fetch = async () => {
    try {
      console.log(token);
      const res = await axios.get("http://localhost:7878/api/jobs/", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      if (res?.data) setRequestedJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) fetch();
  }, [token]);

  const handleJobRequest = async (requestedJob, reply) => {
    try {
      const replyObj = {
        id: requestedJob.id,
        user_id: requestedJob.user_id,
        job_id: requestedJob.job_id,
        acceptance: reply,
      };
      console.log(replyObj);
      const res = await axios.put(
        `http://localhost:7878/api/jobRequests/6635261011a02ac21d9c3f20${requestedJob.id}`,
        replyObj,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      if (res?.data) fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Applied User</h1>
      <Table striped bordered hover size="1m">
        <thead>
          <tr>
            <th>ID</th>
            <th>user_id</th>
            <th>job_id</th>
            <th>Name</th>
            <th>Job Position</th>
            <th>Job Description</th>
            <th>Job Qualification</th>
            <th>User Skills</th>
            <th>PhoneNumber</th>
            {/* <th>Status</th> */}
            <th>acceptance</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requestedJobs?.map((requestedJob) => (
            <tr key={requestedJob.id} id={requestedJob.id}>
              <td>{requestedJob.id}</td>
              <td>{requestedJob.user_id}</td>
              <td>{requestedJob.job_id}</td>
              <td>{requestedJob.firstName}</td>
              <td>{requestedJob.position}</td>
              <td>{requestedJob.description}</td>
              <td>{requestedJob.qualification}</td>
              <td>{requestedJob.skill}</td>
              <td>{requestedJob.phone}</td>
              {/* <td>{requestedJob.status}</td> */}
              <td>
                {requestedJob.acceptance === 1
                  ? "approved"
                  : requestedJob.acceptance === 0
                  ? "rejected"
                  : "pending"}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-primary mx-2"
                  style={{ margin: "0%" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleJobRequest(requestedJob, 1);
                  }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  style={{ margin: "0%" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleJobRequest(requestedJob, 0);
                  }}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default GetUser;
