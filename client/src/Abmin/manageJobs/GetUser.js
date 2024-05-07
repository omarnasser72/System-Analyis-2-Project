import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../Storage/Storage";

const GetUser = () => {
  const token = getAuthUser().token;
  console.log(token);
  const [requestedJobs, setRequestedJobs] = useState([]);
  const [jobServiceIsDown, setJobServiceIsDown] = useState(false);

  const fetch = async () => {
    try {
      const res = await axios.get("http://localhost:7878/api/jobRequests/", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
      console.log(res?.data);
      if (res?.data) setRequestedJobs(res.data);
      else setJobServiceIsDown(true);
    } catch (error) {
      setJobServiceIsDown(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleJobRequest = async (requestedJob, reply) => {
    try {
      const replyObj = {
        //id: requestedJob.id,
        user_id: requestedJob.user_id,
        job_id: requestedJob.job_id,
        acceptance: reply.toString(),
      };
      console.log(replyObj);
      const res = await axios.put(
        `http://localhost:7878/api/jobRequests/${requestedJob._id}`,
        replyObj,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(res);
      if (res?.data) fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ minHeight: "60vh" }}>
      {!jobServiceIsDown && (
        <>
          <h1> Applied User</h1>
          <Table striped bordered hover size="1m">
            <thead>
              <tr>
                <th>user_id</th>
                <th>job_id</th>
                <th>acceptance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requestedJobs?.map((requestedJob) => (
                <tr key={requestedJob._id} id={requestedJob._id}>
                  <td>{requestedJob.user_id}</td>
                  <td>{requestedJob.job_id}</td>
                  <td>
                    {requestedJob.acceptance === 1
                      ? "approved"
                      : requestedJob.acceptance === -1
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
                        handleJobRequest(requestedJob, -1);
                      }}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default GetUser;
