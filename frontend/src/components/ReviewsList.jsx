import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewsList({ productId, readOnly = true }) {
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [formData, setFormData] = useState({ rating: "", comment: "" });

  // Get current logged in user ID from localStorage (string)
  const currentUserId = localStorage.getItem("userId");

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews?productId=${productId}`
      );
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
       toast.error("Review deleted successfully....");
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Review deleted failed....")
    }
  };

  const startEditing = (review) => {
    setEditingReview(review._id);
    setFormData({ rating: review.rating, comment: review.comment });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${editingReview}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
            toast.success("Review updated successfully....");
      setEditingReview(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h4>Reviews</h4>
      {reviews.length === 0 && <p>No reviews yet</p>}
      {reviews.map((r) => (
        <div key={r._id} className="border p-2 my-2">
          {editingReview === r._id ? (
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label>Rating</label>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-2">
                <label>Comment</label>
                <textarea
                  className="form-control"
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  required
                />
              </div>
              <button className="btn btn-success btn-sm me-2" type="submit">
                Save
              </button>
              <button
                className="btn btn-secondary btn-sm"
                type="button"
                onClick={() => setEditingReview(null)}
              >
                Cancel
              </button>
            </form>
          ) : (
            <>
              <strong>{r.user?.name}</strong> — ⭐ {r.rating}
              <p>{r.comment}</p>
              {/* Show buttons only if not readOnly AND current user owns the review */}
              {!readOnly && r.user?._id?.toString() === currentUserId && (
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEditing(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteReview(r._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      ))}
                  <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
