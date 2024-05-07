import React, { useEffect } from "react";
//import { Form } from 'react-router-dom';
import Form from "react-bootstrap/Form";
//import "./Updateuser.css";
import { useState, useRef } from "react";
import { getAuthUser } from "../../Storage/Storage";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Alert } from "react-bootstrap";

const UpdateJob = () => {
  let { id } = useParams();
  console.log(id);
  const [job, setJob] = useState({
    success: "",
    loading: false,
    err: null,
  });
  const [currJob, setCurrJob] = useState("");
  const [fetchedJob, setFetchedJob] = useState("");
  const [jobObj, setJobObj] = useState("");
  const [justUpdated, setJustUpdated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setJobObj({
      ...fetchedJob,
      ...currJob,
    });
    console.log("jobObj: ", jobObj);
  }, [currJob, fetchedJob]);

  useEffect(() => {
    const fetch = async () => {
      console.log(id);
      try {
        const res = await axios.get(`http://localhost:7878/api/jobs/${id}`, {
          headers: {
            token: auth.token,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        if (res?.data) {
          setFetchedJob(res.data);
          setCurrJob(res.data);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(fetchedJob);
  }, [fetchedJob]);

  useEffect(() => {
    console.log(justUpdated);
  }, [justUpdated]);

  const auth = getAuthUser();
  let token = null;
  if (auth) {
    token = auth.token;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(id);
      if (jobObj.offer !== undefined) {
        jobObj.offer = jobObj.offer.toString();
      }
      const { __v, _id } = jobObj;
      console.log(jobObj);
      const res = await axios.put(
        `http://localhost:7878/api/jobs/${id}`,
        jobObj,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(res);
      if (res?.data) {
        setFetchedJob(res.data);
        setJustUpdated(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleChange = (e) => {
    console.log("dfddd");
    console.log(e.target.files);
    setCurrJob({ ...currJob, image_url: e.target.files[0].name });
  };

  console.log(jobObj);
  return (
    <div className="login-container ">
      <h1> Update Job</h1>

      {job.err && (
        <Alert variant="danger" className="p-2">
          {job.err}
        </Alert>
      )}

      <Form onSubmit={handleUpdate}>
        {fetchedJob &&
          Object.keys(fetchedJob).map((key) =>
            key === "__v" || key === "_id" || key === "image_url" ? (
              <></>
            ) : (
              <Form.Group className="mb-5" key={key}>
                <label>
                  {key}
                  {" :"}
                </label>
                <textarea
                  className="form-control w-50"
                  rows={1}
                  placeholder={key}
                  value={currJob[key]}
                  onChange={(e) =>
                    setCurrJob({ ...currJob, [key]: e.target.value })
                  }
                ></textarea>
              </Form.Group>
            )
          )}
        <Form.Group>
          <input
            type="file"
            className="form-control w-50"
            value={job?.image_url}
            onInput={handleChange}
          />
        </Form.Group>
        <button type="submit" className="btn btn-dark">
          Update
        </button>
      </Form>
      {justUpdated && (
        <div
          style={{
            backgroundColor: "rgb(174, 255, 137)",
            padding: "20px",
            fontWeight: "600",
            margin: "20px",
            width: "fit-content",
          }}
          onClick={() => setJustUpdated(false)}
        >
          Job Updated successfully
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
export default UpdateJob;
