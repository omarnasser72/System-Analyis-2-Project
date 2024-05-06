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
    status: "",
    loading: false,
    err: null,
  });
  const [currJob, setCurrJob] = useState("");
  const [fetchedJob, setFetchedJob] = useState("");
  const [justUpdated, setJustUpdated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:7878/api/jobs/66340d12314a034b8c4a80b7/${id}`, {
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

  //   const UpdateUserfun = (e) => {
  //     e.preventDefault();
  //     setJob({ ...job, loading: true, err: [] });

  //     const formData = new FormData();
  //     formData.append("status", job.status);

  //     axios
  //       .put("http://localhost:4000//update-user-status/" + id, formData, {
  //         headers: {
  //           token: auth.token,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((resp) => {
  //         console.log(resp);
  //         setJob({
  //           ...job,
  //           status: "",
  //           loading: false,
  //           err: null,
  //           success: "user Updated Successfully !",
  //         });
  //       })
  //       .catch((errors) => {
  //         setJob({
  //           ...job,
  //           loading: false,
  //           success: null,
  //           err: errors.response.data.errors,
  //         });
  //       });
  //   };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(id);

      const jobObj = {
        ...fetchedJob,
        ...currJob,
      };
      const res = await axios.put(
        `http://localhost:7878/api/jobs/66340a12285b8ce72119d2a4${id}`,
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

  return (
    <div className="login-container ">
      <h1> Update user</h1>

      {job.err && (
        <Alert variant="danger" className="p-2">
          {job.err}
        </Alert>
      )}

      {job.success && (
        <Alert variant="success" className="p-2">
          {job.success}
        </Alert>
      )}

      <Form onSubmit={handleUpdate}>
        {fetchedJob &&
          Object.keys(fetchedJob).map((key) => (
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
          ))}

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
