import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./AddJob.css";
import { useState } from "react";
import { getAuthUser } from "../../Storage/Storage";
import axios from "axios";
import { Alert } from "react-bootstrap";

const AddJob = () => {
  const token = getAuthUser()?.token;
  console.log(token);

  const [job, setjob] = useState({
    position: "",
    qualification: "",
    max_candidate_number: "",
    offer: "",
    description: "",
    image_url: "",
    loading: false,
    err: null,
  });

  const [error, setError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [jobServiceIsDown, setJobServiceIsDown] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7878/api/jobs", job, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      console.log(error);

      if (res?.data) {
        setJustAdded(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else setJobServiceIsDown(true);
    } catch (error) {
      setjob({
        ...job,
        loading: false,
        err: "Job service is down, please try again later ! ",
      });
      setJobServiceIsDown(true);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("job: ", job);
    console.log(job?.err);
  }, [job]);

  return (
    <div className="login-container" style={{ minHeight: "60vh" }}>
      <h1> Add new Job</h1>

      {job?.err && (
        <Alert
          variant="danger"
          className="p-2"
          style={{ width: "fit-content" }}
        >
          {job?.err}
        </Alert>
      )}

      {!job?.err && (
        <Form onSubmit={handleClick}>
          <Form.Group className="mb-3 w-50 ">
            <Form.Control
              type="text"
              placeholder="Job position"
              value={job.position}
              onChange={(e) => {
                setjob({ ...job, position: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <textarea
              className="form-control w-50"
              rows={2}
              placeholder="Description"
              value={job.description}
              onChange={(e) => setjob({ ...job, description: e.target.value })}
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <textarea
              className="form-control w-50"
              rows={1}
              placeholder="Qualfication"
              value={job.qualification}
              onChange={(e) =>
                setjob({ ...job, qualification: e.target.value })
              }
            ></textarea>
          </Form.Group>
          <Form.Group className="mb-3">
            <textarea
              className="form-control w-50"
              rows={1}
              placeholder="Offer"
              value={job.offer}
              onChange={(e) => setjob({ ...job, offer: e.target.value })}
            ></textarea>
          </Form.Group>
          <Form.Group>
            <input
              type="file"
              className="form-control w-50"
              value={job?.image}
              onChange={(e) =>
                setjob({ ...job, image_url: e.target.files[0].name })
              }
            />
          </Form.Group>

          <button className="btn btn-dark " type="submit">
            Add
          </button>
        </Form>
      )}
      {justAdded && (
        <div
          style={{
            backgroundColor: "rgb(174, 255, 137)",
            padding: "20px",
            fontWeight: "600",
            margin: "20px",
            width: "fit-content",
          }}
          onClick={() => setJustAdded(false)}
        >
          Job added successfully
        </div>
      )}
      {error && (
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

export default AddJob;
