import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { authAxios } from '../utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'; 
const AuthForm = () => {
    const navigate = useNavigate(); 
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/login' : '/signup';
        try {
            const { data } = await authAxios.post(url, formData);
            if (data.jwtToken) {
                localStorage.setItem('token', data.jwtToken);
            }
             toast.success(data.message);
            setFormData({ name: '', email: '', password: '' });
            console.log(data)

            if (isLogin ? '/login' : '/signup') {
                navigate('/'); 
                setIsLogin(true);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Server Error....");
        }
    };

    return (
        <>
            <div className="bg-white p-4 rounded shadow-sm"
                style={{
                    maxWidth: '420px',
                    margin: '100px auto',
                    border: '1px solid #e0e0e0',
                }}
            >
                <h2 className="text-center mb-4 text-primary fw-bold">
                    {isLogin ? 'Login' : 'Signup'}
                </h2>

                <Form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                onChange={handleChange}
                                value={formData.name}
                                required
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </Form.Group>

                    <Link to="/forgot-password" className="btn btn-link">
                        Forgot Password?
                    </Link>

                    <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
                        {isLogin ? 'Login' : 'Signup'}
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin
                            ? "Don't have an account? Signup"
                            : "Already have an account? Login"}
                    </Button>
                </div>

                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        </>
    );
};

export default AuthForm;
