import React, { useEffect } from "react";
//import { Form } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import "./AddJob.css";
import { useState, useRef } from "react";
import { getAuthUser } from "../../Storage/Storage";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";

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
    err: [],
  });

  const [error, setError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  // const AddJobFun = (e) => {
  //   e.preventDefault();
  //   setjob({ ...job, loading: true, err: [] });

  //   const formData = new FormData();
  //   formData.append(" position", job.position);
  //   formData.append("description", job.description);
  //   formData.append("qualification", job.qualification);
  //   formData.append("max_candidate_number", job.max_candidate_number);
  //   formData.append("offer", job.offer);
  //   if (image?.current?.files && image?.current?.files[0]) {
  //     formData.append("image", image.current.files[0]);
  //   }

  //   console.log(formData);
  //   axios
  //     .post("http://localhost:4000//create-job", formData, {
  //       headers: {
  //         token: token,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((resp) => {
  //       console.log(resp);
  //       setjob({
  //         position: "",
  //         qualification: "",
  //         max_candidate_number: "",
  //         offer: "",
  //         description: "",
  //         image: "",
  //         loading: false,
  //         err: null,
  //         success: "Job Added Successfully !",
  //       });
  //       image.current.value = null;
  //     })
  //     .catch((errors) => {
  //       setjob({
  //         ...job,
  //         loading: false,
  //         success: null,
  //         err: errors.response.data.errors,
  //       });
  //     });
  // };

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

      if (res?.data) setJustAdded(true);
      const timeout = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timeout);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("job: ", job);
    console.log(job?.err);
  }, [job]);

  return (
    <div className="login-container ">
      <h1> Add new Job</h1>

      {job?.err?.length > 0 && (
        <Alert variant="danger" className="p-2">
          {job.err.map((error, index) => (
            <div key={index}>
              <p>{error.msg}</p>
              <p>{error.param}</p>
            </div>
          ))}
        </Alert>
      )}

      {job.success && (
        <Alert variant="success" className="p-2">
          {job.success}
        </Alert>
      )}

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
            onChange={(e) => setjob({ ...job, qualification: e.target.value })}
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
        <Form.Group className="mb-3">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="  max_candidate_number"
            value={job.max_candidate_number}
            onChange={(e) =>
              setjob({ ...job, max_candidate_number: e.target.value })
            }
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
