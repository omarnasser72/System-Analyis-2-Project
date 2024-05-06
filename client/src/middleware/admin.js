import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getAuthUser } from "../Storage/Storage";

const Admin = () => {
  const auth = getAuthUser();
  const navigate = useNavigate();
  console.log("In Admin:", auth);

  return <>{auth?.type === 1 ? <Outlet /> : <Navigate to={"/login"} />}</>;
  //return(<Outlet/>);
};

export default Admin;
