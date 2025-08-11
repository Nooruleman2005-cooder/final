import { useParams, Link } from "react-router-dom";
import ReviewsList from "../components/ReviewsList";

export default function ProductDetail() {
  const { id } = useParams();

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
        Product Details
      </h2>

      {/* TODO: Yaha product info fetch karo */}
      <div className="mb-4">
        <ReviewsList productId={id} readOnly={true} />
      </div>

      <div className="text-center">
        <Link
          to={`/product/${id}/reviews`}
          className="btn btn-outline-primary fw-bold px-4"
        >
          Manage Reviews
        </Link>
      </div>
    </div>
  );
}
