import React, { useEffect, useState } from 'react';
import { Button, Nav, Container, Navbar } from 'react-bootstrap';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.error("User Logout Successfully...")
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-primary" fixed='top' >
      <Container fluid >
        <Navbar.Brand as={Link} to="/" className="text-white">
          Hijab Studio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto text-center">
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/" className="text-white">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/product" className="text-white">
                  Add Product
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="text-white">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-white">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-white">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <ToastContainer position="top-center" autoClose={2000} />
    </Navbar>
  );
};

export default Header;

