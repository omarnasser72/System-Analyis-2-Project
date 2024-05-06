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

const UpdateUser = () => {
  let { id } = useParams();
  console.log(id);
  const [user, setuser] = useState({
    status: "",
    loading: false,
    err: null,
  });
  const [currUser, setCurrUser] = useState("");
  const [fetchedUser, setFetchedUser] = useState("");
  const [justUpdated, setJustUpdated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:4000//get-user/${id}`, {
          headers: {
            token: auth.token,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res);
        if (res?.data) {
          setFetchedUser(res.data);
          setCurrUser(res.data);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    console.log(fetchedUser);
  }, [fetchedUser]);

  useEffect(() => {
    console.log(justUpdated);
  }, [justUpdated]);

  const auth = getAuthUser();
  let token = null;
  if (auth) {
    token = auth.token;
  }

  const UpdateUserfun = (e) => {
    e.preventDefault();
    setuser({ ...user, loading: true, err: [] });

    const formData = new FormData();
    formData.append("status", user.status);

    axios
      .put("http://localhost:4000//update-user-status/" + id, formData, {
        headers: {
          token: auth.token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log(resp);
        setuser({
          ...user,
          status: "",
          loading: false,
          err: null,
          success: "user Updated Successfully !",
        });
      })
      .catch((errors) => {
        setuser({
          ...user,
          loading: false,
          success: null,
          err: errors.response.data.errors,
        });
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(id);

      const userObj = {
        ...fetchedUser,
        ...currUser,
      };
      const res = await axios.put(
        `http://localhost:4000//update-user/${id}`,
        userObj,
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );
      console.log(res);
      if (res?.data) {
        setFetchedUser(res.data);
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

      {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}

      <Form onSubmit={UpdateUserfun}>
        {/* <Form.Group className="mb-5">
          <textarea
            className="form-control w-50"
            rows={1}
            placeholder="status"
            value={user.status}
            onChange={(e) => setuser({ ...user, status: e.target.value })}
          ></textarea>
        </Form.Group> */}
        {fetchedUser &&
          Object.keys(fetchedUser).map((key) => (
            <Form.Group className="mb-5" key={key}>
              <label>
                {key}
                {" :"}
              </label>
              <textarea
                className="form-control w-50"
                rows={1}
                placeholder={key}
                value={currUser[key]}
                onChange={(e) =>
                  setCurrUser({ ...currUser, [key]: e.target.value })
                }
              ></textarea>
            </Form.Group>
          ))}

        <button type="submit" className="btn btn-dark" onClick={handleUpdate}>
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
          User updated successfully
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
export default UpdateUser;
