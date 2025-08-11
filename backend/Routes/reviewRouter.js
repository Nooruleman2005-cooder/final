import express from 'express';
import verifyToken from '../Middlewares/verifyToken.js';
import { listReviews, createReview, updateReview, deleteReview } from '../Controllers/reviewController.js';

const router = express.Router();

// GET /api/reviews?productId=...
router.get('/', listReviews);
// POST /api/reviews (auth required)
router.post('/', verifyToken, createReview);
// PUT /api/reviews/:id (auth required)
router.put('/:id', verifyToken, updateReview);
// DELETE /api/reviews/:id (auth required)
router.delete('/:id', verifyToken, deleteReview);

export default router;