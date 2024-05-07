import React from "react";
import { Alert, Table } from "react-bootstrap";
import { getAuthUser } from "../../Storage/Storage.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
const GetJob = () => {
  const auth = getAuthUser();
  const id = auth._id;
  const [jobRequests, setJobRequests] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setJobRequests({ ...jobRequests, loading: true });
    axios
      .get(`http://localhost:7878/api/jobRequests/${id}`, {
        headers: { token: auth.token, "Content-Type": "multipart/form-data" },
      })
      .then((resp) => {
        setJobRequests({
          ...jobRequests,
          results: resp.data,
          loading: false,
          err: null,
        });
      })
      .catch((err) => {
        setJobRequests({
          ...jobRequests,
          loading: false,
          err: "Job service is down, please try again later ! ",
        });
      });
  }, [jobRequests.reload]);

  console.log(jobRequests);

  return (
    <div
      style={{
        minHeight: "60vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {jobRequests?.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
      {jobRequests?.loading === false && jobRequests?.err === null && (
        <>
          <h1> Applied User</h1>
          <Table striped bordered hover size="1m">
            <thead>
              <tr>
                <th>ID</th>
                <th>job id</th>
                <th>acceptance</th>
              </tr>
            </thead>
            <tbody>
              {jobRequests.results.map((request) => (
                <tr key={request._id}>
                  <td> {request._id} </td>
                  <td> {request.job_id} </td>
                  <td>
                    {request.acceptance === 1
                      ? "accepted"
                      : request.acceptance === 0
                      ? "pending"
                      : "rejected"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {jobRequests.loading === false && jobRequests.err !== null && (
        <Alert variant="danger" className="p-2" style={{ margin: "5%" }}>
          {jobRequests.err}
        </Alert>
      )}
    </div>
  );
};

export default GetJob;
