import Review from '../Models/reviews.js';

// GET reviews
export async function listReviews(req, res) {
  try {
    const { productId } = req.query;
    const filter = {};
    if (productId) filter.productId = productId;

    const reviews = await Review.find(filter).populate('user', 'name  email');

    console.log('Fetched reviews with users:', reviews);

    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err.message);
    res.status(500).json({ message: err.message });
  }
}


// CREATE review
export async function createReview(req, res) {
  try {
    const { productId, rating, comment } = req.body;

    const review = new Review({
      user: req.user._id,
      productId,
      rating,
      comment
    });

    await review.save();
    const full = await review.populate('user', 'name email');
    res.status(201).json(full);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// UPDATE review
export async function updateReview(req, res) {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not allowed' });

    const { rating, comment } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    const full = await review.populate('user', 'name email');
    res.json(full);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// DELETE review
export async function deleteReview(req, res) {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not allowed' });

    await review.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
