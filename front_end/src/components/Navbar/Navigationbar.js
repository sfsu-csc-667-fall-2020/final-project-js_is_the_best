import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";
import Axios from "axios";

const Navigationbar = () => {
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  const handleLogout = () => {
    Axios.post("/auth/logout").then(res => {
      if (res.data.success) {
        dispatch(logoutUser());
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">JS is the Best</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link href="/postlisting">Post Listing</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </>
            ) : null}
          </Nav>
          {isLoggedIn ? (
            <Button
              variant="secondary"
              style={{ marginRight: 5 }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                style={{ marginRight: 5 }}
                href="/login"
              >
                Log In
              </Button>
              <Button variant="outline-info" href="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigationbar;
