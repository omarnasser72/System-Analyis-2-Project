import React from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getAuthUser } from "../Storage/Storage";

const Guest = () => {
  const auth = getAuthUser();
  console.log("In Guest:", auth);
  if (auth === undefined) console.log("auth is und");

  return <>{auth !== undefined ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default Guest;
