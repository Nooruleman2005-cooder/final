import express from 'express';
import upload from '../Middlewares/upload.js';
import authMiddleware from '../Middlewares/authMiddleware.js';
import {
  createProduct,
  getAllProducts
} from '../Controllers/productController.js';

const router = express.Router();

// ********* Create product with image ********
router.post('/', authMiddleware, upload.single('image'), createProduct);

// ********* Product listing & details ********
router.get('/', getAllProducts);


export default router;
