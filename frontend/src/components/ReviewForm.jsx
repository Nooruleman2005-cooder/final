import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        { productId, rating, comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Review Added Successfully ....")
      setComment("");
      setRating(5);
      toast.success("Review Added Successfully ....")
      onReviewAdded(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Review Added Failed....")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <h5>Add Review</h5>
      <div className="mb-2">
        <label>Rating</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>Comment</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
        <ToastContainer position="top-center" autoClose={2000} />
    </form>
  );
}
