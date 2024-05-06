import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./JobCard.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { getAuthUser } from "../../Storage/Storage.js";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const JobCard = (props) => {
  let { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  console.log("props", props);

  const token = getAuthUser()?.token;
  const userId = getAuthUser()?.id;

  const [jobs, setjobs] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  const [applied, setApplied] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [failedMsg, setFailedMsg] = useState("failed to apply");

  const Applyjob = (job_id) => {
    console.log("apply button");
    console.log("token", token);
    const applyObj = {
      job_id,
      user_id: props.userId,
    };
    axios
      .post(`http://localhost:7878/api/jobRequests${job_id}`, applyObj, {
        headers: { token: token, "Content-Type": "application/json" },
      })
      .then((resp) => {
        console.log(resp);
        if (resp?.data?.applyObj) setApplicationSuccess(true);

        setjobs({ ...jobs, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        console.log(err);

        if (err?.response?.data?.ms) setFailedMsg(err.response.data.ms);

        setApplicationSuccess(false);

        setjobs({
          ...jobs,
          loading: false,
          err: err || " something went wrong, please try again later ! ",
        });
      });
    setApplied(true);

    setTimeout(() => {
      setApplied(false);
    }, 1000);
  };

  const [rate, setRate] = useState("");
  const [currJobId, setCurrJobId] = useState("");
  const [waitingToSubmitRate, setRateSubmission] = useState(false);

  useEffect(() => {
    console.log(waitingToSubmitRate);
  }, [waitingToSubmitRate]);

  useEffect(() => {
    console.log(rate);
    console.log(currJobId);
  }, [rate, currJobId]);

  const handleRateChange = (e, jobId) => {
    setRate(e.target.value);
    setCurrJobId(jobId);
  };

  const handleRateClick = async (e) => {
    try {
      const res = await axios.post(`http://localhost:7878/api/jobRequests`, {
        jobId: currJobId.toString(),
        userId: userId.toString(),
        rating: parseInt(rate),
      });
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card className="card" style={{ height: "190vh" }}>
        {waitingToSubmitRate ? (
          <>
            <Card.Title>{props.position}</Card.Title>
            <Card.Img
              className="card-img"
              variant="top"
              src={props.image_url}
            />
            <div className="submissionSec">
              <div className="submissionSubSec">
                <Rating
                  precision={1}
                  onChange={(e) => handleRateChange(e, props.id)}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="closeRateSubmission"
                  onClick={() => setRateSubmission(false)}
                />
              </div>
              <button className="subBtn" onClick={handleRateClick}>
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <Card.Title>{props.position}</Card.Title>
            <Card.Img
              className="card-img"
              variant="top"
              src={props.image_url}
            />
            <Card.Body>
              <Card.Title>{props.position}</Card.Title>
              <Card.Text>{props.description}</Card.Text>
              <Card.Text>{props.qualification}</Card.Text>
              <Card.Text>{props.offer}</Card.Text>
              <div className="ratingSec">
                <button className="rate">{props.rate}</button>
                <button
                  className="rateBtn"
                  onClick={() => setRateSubmission(true)}
                >
                  Rate
                </button>
              </div>
              <button
                className="btn btn-dark w-100 m-0"
                onClick={(e) => Applyjob(props.id)}
              >
                Apply
              </button>
            </Card.Body>
          </>
        )}
      </Card>
      {applied ? (
        applicationSuccess ? (
          <div
            style={{
              backgroundColor: "rgb(146, 255, 169)",
              color: "green",
              textAlign: "center",
              padding: "5px",
            }}
          >
            applied successfully
          </div>
        ) : (
          <div
            style={{
              backgroundColor: "rgb(255, 146, 146)",
              color: "red",
              textAlign: "center",
              padding: "5px",
            }}
          >
            {failedMsg}
          </div>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default JobCard;
