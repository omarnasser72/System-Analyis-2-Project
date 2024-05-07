import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { removeAuthUser, getAuthUser } from "../../Storage/Storage";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    console.log(auth.user);
    removeAuthUser();
    navigate("/Login");
  };
  console.log(auth);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link className="nav-link" to={"/"}>
              Hire Me
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            {auth && auth.type === 0 && (
              <>
                <Link className="nav-link" to={"/GetJob"}>
                  Get Applied jobs
                </Link>
                <Link className="nav-link" to={"/ContactUs"}>
                  Contact Us
                </Link>
                <Link className="nav-link" to={"/AboutUs"}>
                  About Us
                </Link>
                <Link className="nav-link" to={"/Companies"}>
                  Companies
                </Link>
              </>
            )}
            {!auth && (
              <>
                <Link className="nav-link" to={"/Signup"}>
                  Sign up
                </Link>

                <Link className="nav-link" to={"/Login"}>
                  Log In
                </Link>
                <Link className="nav-link" to={"/AboutUs"}>
                  About Us
                </Link>
                <Link className="nav-link" to={"/Companies"}>
                  Companies
                </Link>
              </>
            )}

            {auth && auth.type === 1 && (
              <>
                <Link className="nav-link" to={"/manageJobs"}>
                  Manage jobs
                </Link>
                <Link className="nav-link" to={"/manageCompanies"}>
                  Manage Companies
                </Link>
                <Link className="nav-link" to={"/contactUsMessages"}>
                  Contact Us Messages
                </Link>
              </>
            )}
          </Nav>
          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
