import { useParams } from "react-router-dom";
import { useState } from "react";
import ReviewsList from "../components/ReviewsList";
import ReviewForm from "../components/ReviewForm";

export default function ReviewsPage() {
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);

  const reloadReviews = () => setRefresh((prev) => !prev);


  return (
    <div
      className="bg-white p-4 rounded shadow-sm"
      style={{
        margin: "100px auto",
        border: "1px solid #e0e0e0",
        maxWidth: "800px",
      }}
    >
      <h2 className="text-center mb-4 text-primary fw-bold">
        Manage Reviews
      </h2>

      {/* Review form */}
      <div className="mb-4">
        <ReviewForm productId={id} onReviewAdded={reloadReviews} />
      </div>

      {/* Review list */}
      <ReviewsList key={refresh} productId={id} readOnly={false} />
    </div>
  );
}
