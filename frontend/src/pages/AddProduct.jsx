import React, { useState } from 'react';
import { productAxios } from '../utils/axios';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
        const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };
    const handleImageChange = (e) => {
        setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    // hm, aesa bhikr skta hainnn
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({ ...prev, [name]: value }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Image file:', formData.image);

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('image', formData.image);

            const token = localStorage.getItem('token');

            const res = await productAxios.post('/', data ,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Product created:', res.data);
            toast.success('Product Added Successfully....');
             setFormData({
                name: '',
                description: '',
                price: '',
                image: null
            });
            setTimeout(() => navigate('/'), 2000);

        } catch (err) {
            console.error('Error:', err);
            toast.error('Failed To Add Product....');
        }
    }
    return (
        <div
            className="bg-white p-4 rounded shadow-sm"
            style={{
                margin: '100px auto',
                border: '1px solid #e0e0e0',
                overflowX: 'auto'
            }}
        >
            <h2 className="text-center mb-4 text-primary fw-bold">Add Product</h2>

            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter product name"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={formData.description}
                        placeholder="Enter product description"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={formData.price}
                        placeholder="Enter price"
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 fw-bold py-2">
                    Add Product
                </Button>
            </Form>

            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    )
}

export default AddProduct
