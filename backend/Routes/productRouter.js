import express from 'express';
import upload from '../Middlewares/upload.js';
import authMiddleware from '../Middlewares/authMiddleware.js'
import {createProduct , getAllProducts , getSingleProduct , addReview} from '../Controllers/productController.js';
import verifyToken from '../Middlewares/verifyToken.js';

const router = express.Router();

// ********* oute to create product with image********
router.post('/' , authMiddleware, upload.single('image'), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.post('/:id/reviews', verifyToken, addReview);

export default router