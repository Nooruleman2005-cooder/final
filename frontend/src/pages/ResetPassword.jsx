import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import {authAxios} from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const { data } = await authAxios.post(`/reset-password/${token}`, { password });
      toast.success(data.message);
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
      <h2 className="text-center mb-4 text-primary fw-bold">Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
          Reset Password
        </Button>
      </Form>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ResetPassword;
