import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productAxios } from '../utils/axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productAxios.get(`/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('Error fetching product', err));
  }, [id]);

  // Submit review handler
  const submitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error('You must be logged in to add a review');
      return;
    }

    setLoading(true);

    console.log('Sending token:', token);

    try {
      const res = await productAxios.post(`/${id}/reviews`, { rating, comment }, {
        headers: {
          Authorization: `Bearer ${token}`  // <-- backticks and ${} interpolation
        }
      });
      setProduct(res.data);
      setRating(0);
      setComment('');
      toast.success('Review Added Successfully....');
    } catch (err) {
      console.error('Error adding review:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Error adding review....');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h3 className="mb-3">Reviews</h3>

          {(product.reviews?.length ?? 0) === 0 && (
            <p className="text-muted">No reviews yet.</p>
          )}

          {product.reviews?.map(review => (
            <div key={review._id} className="mb-3 border rounded p-3">
              <strong>{review.name}</strong> - Rating: {review.rating} <br />
              <small className="text-muted">{review.comment}</small>
            </div>
          ))}

          <form onSubmit={submitReview} className="mt-4">
            <h4>Add a Review</h4>

            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating (1 to 5)
              </label>
              <input
                id="rating"
                type="number"
                className="form-control"
                min="1"
                max="5"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <textarea
                id="comment"
                className="form-control"
                rows="3"
                value={comment}
                onChange={e => setComment(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default ProductDetails;
