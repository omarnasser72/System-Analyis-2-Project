import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { getAuthUser } from "../../Storage/Storage";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [userToken, setUserToken] = useState(
    getAuthUser()?.token ||
      localStorage
        .getItem("user")
        .split("token")[1]
        .split(`":"`)[1]
        .split(`"`)[0]
  );
  const [changeOccurs, setChange] = useState("");

  useEffect(() => {
    console.log(userToken);
  }, [userToken]);

  useEffect(() => {
    const fetch = async () => {
      try {
        console.log(userToken);
        const res = await axios.get("http://localhost:4000//get-users", {
          headers: {
            "Content-Type": "application/json",
            token: userToken,
          },
        });
        if (res?.data) setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (userToken || changeOccurs) fetch();
  }, [userToken, changeOccurs]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const handleDelete = async (userId) => {
    if (userToken) {
      try {
        console.log(userId);
        const res = await axios.delete(
          `http://localhost:4000//delete-user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              token: userToken,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    setChange(userId);
  };

  return (
    <div className="manage-job p-5">
      <div className="header d-flex justify-content-between mb-3">
        <h3 className="text-center">Manage Users</h3>
        <Link to={"AddUser"} className="btn btn-success">
          Add New User
        </Link>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Skills</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id} id={user.id}>
              <td>{user.id}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.skill}</td>
              {/* <td>{user.status}</td>
              <td>{user.type}</td>*/}
              <td>
                <button
                  className="btn btn-sm btn-danger mx-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(user.id);
                  }}
                >
                  Remove
                </button>
                <Link
                  to={" " + user.id}
                  className="btn btn-sm btn-primary mx-2"
                >
                  update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
