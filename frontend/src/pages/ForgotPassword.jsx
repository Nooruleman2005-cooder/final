import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import {authAxios} from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authAxios.post('/forgot-password', { email });
      toast.success(data.message);
      setEmail('');
      setTimeout(() => navigate('/login'), 2000); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm"
      style={{
        maxWidth: '420px',
        margin: '100px auto',
        border: '1px solid #e0e0e0',
      }}
    >
      <h2 className="text-center mb-4 text-primary fw-bold">Forgot Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
          Send Reset Link
        </Button>
      </Form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ForgotPassword;
