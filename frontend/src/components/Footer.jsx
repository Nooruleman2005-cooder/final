import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
        toast.error("User Logout Successfully...")
    navigate("/login");
  };

  return (
    <footer className="bg-dark text-white text-center text-lg-start mt-5">
      <Container fluid className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Hijab Studio</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.
            </p>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              {isLoggedIn ? (
                <>
                  <li><a href="/home" className="text-white">Home</a></li>
                  <li><a href="/product" className="text-white">Add Product</a></li>
                  <li><span onClick={handleLogout} style={{ cursor: 'pointer' }} className="text-white">Logout</span></li>
                </>
              ) : (
                <>
                  <li><a href="/login" className="text-white">Login</a></li>
                  <li><a href="/signup" className="text-white">Signup</a></li>
                </>
              )}
            </ul>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Social</h5>
            <ul className="list-unstyled">
              <li><a href="#!" className="text-white">Facebook</a></li>
              <li><a href="#!" className="text-white">Twitter</a></li>
              <li><a href="#!" className="text-white">Instagram</a></li>
              <li><a href="#!" className="text-white">LinkedIn</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3 bg-black">
        © {new Date().getFullYear()} Hijab Studio. All rights reserved.
      </div>
            <ToastContainer position="top-center" autoClose={2000} />
    </footer>
  );
};

export default Footer;
