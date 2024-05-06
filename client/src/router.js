import { createBrowserRouter } from "react-router-dom";
import HomePage from "../src/Enter our site/home/HomePage";
import App from "./App";
import Signup from "./Enter our site/signup/Signup";
import Login from "./Enter our site/Login/Login";
import NotFound from "./component/NotFound/NotFound";
import ContactUs from "./Enter our site/Contact Us/ContactUs";
import AboutUs from "./Enter our site/AboutUs/AboutUs";

import ManageJobs from "./Abmin/manageJobs/ManageJobs";
import UpdateJob from "./Abmin/manageJobs/UpdateJob";
import AddJob from "./Abmin/manageJobs/AddJob";
import ManageCompanies from "./Abmin/manageCompanies/ManageCompanies";
import UpdateCompanies from "./Abmin/manageCompanies/UpdateCompanies";
import AddCompany from "./Abmin/manageCompanies/AddCompany";
import Guest from "./middleware/guest";
import Admin from "./middleware/admin";
import GetUser from "./Abmin/manageJobs/GetUser";
import GetJob from "./Enter our site/GetJob/GetJob";
import Companies from "./Enter our site/Companies/Companies";
export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/ContactUs",
        element: <ContactUs />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
        {
          path: "/Companies",
          element: <Companies />,
        },
      
      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },

          {
            path: "/GetJob",
            element: <GetJob />,
          },
         
        ],
      },
      {
        path: "/manageJobs",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageJobs />,
          },
          {
            path: "AddJob",
            element: <AddJob />,
          },
          {
            path: "GetUser",
            element: <GetUser />,
          },
          {
            path: ":id",
            element: <UpdateJob />,
          },
        ],
      },
      {
        path: "/ManageCompanies",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageCompanies />,
          },
          {
            path: "AddCompany",
            element: <AddCompany />,
          },
          {
            path: ":id",
            element: <UpdateCompanies />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
