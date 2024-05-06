import React from "react";
import { useState, useEffect } from "react";
import "./Home.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../Storage/Storage";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";

const HomePage = () => {
  
  const navigate = useNavigate();
  const token = getAuthUser()?.token;
  const userId = getAuthUser()?.id;
  console.log(userId);
  const [jobs, setjobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setjobs({ ...jobs, loading: true });
    axios
      .get("http://localhost:7878/api/jobs/", {
        // params: {
        //   search: search,
        // },
        headers: { token: token },
      })
      .then(async (resp) => {
        console.log(resp);
        console.log(resp.data);
        await Promise.all(
          resp.data?.map(async (job) => {
            const res = await axios.get(
              `http://localhost:7878/api/jobRating/get/${job.id}`
            );
            console.log(res);
            job.rate = res?.data?.jobRate;
          })
        );
        console.log("mapping finished");
        setjobs({ ...jobs, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setjobs({
          ...jobs,
          loading: false,
          err:
            err?.response.data.message ||
            " something went wrong, please try again later ! ",
        });
        console.log(err);
      });
  }, [jobs.reload]);

  const searchjobs = (e) => {
    e.preventDefault();
    setjobs({ ...jobs, reload: jobs.reload + 1 });
  };

  useEffect(() => {
    console.log(jobs);
  }, [jobs]);

  return (
    
    <div className="home-container p-5">
      {jobs.loading === true && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <div className="visually-hidden">Loading...</div>
          </Spinner>
        </div>
      )}
   
      {jobs.loading === false && jobs.err == null && (
        <>
          <Form onSubmit={searchjobs}>
            <Form.Group className=" d-flex mb-3 ">
              <Form.Control
                type="text"
                placeholder="Search your job"
                className="  rounded-0 "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Form>

          {/* jobs */}
          <div className="row">
            {jobs?.results.map((job) => (
              <div className="col-3 card-job-container  " key={job.id}>
                <JobCard
                  userId={userId}
                  id={job.id}
                  position={job.position}
                  description={job.description}
                  offer={job.offer}
                  image_url={job.image_url}
                  qualification={job.qualification}
                  rate={job.rate}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {jobs.loading === false && jobs.err !== null && (
        <Alert variant="danger" className="p-2">
          {" "}
          {jobs.err}{" "}
        </Alert>
      )}
      {(jobs?.loading === false && jobs?.err === null) ||
        (jobs?.results?.length === 0 && (
          <Alert variant="info" className="p-2">
            {" "}
            No jobs, please try again later !
          </Alert>
        ))}
    </div>
  );
};

export default HomePage;
