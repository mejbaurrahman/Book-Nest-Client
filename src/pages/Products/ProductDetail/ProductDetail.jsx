import Swal from "sweetalert2";
import ProductRating from "../../../components/Shared/ProductRating/ProductRating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  console.log("ProductDetail");
  const [book, setBook] = useState([]);
  const { _id } = useParams();
  console.log(_id);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBook(data);
      })
      .catch((err) => console.log(err.message));
  }, [_id]);
  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={book?.img}
          className="lg:w-1/3 md:w-1/2 w-4/5 rounded-lg shadow-2xl"
        />
        <div className="lg:p-2 md:p-2 p-5">
          <h2 className="text-4xl mx-1">{book?.book}</h2>
          <h5 className="mx-1">{book?.author}</h5>
          <h6 className="mx-1">{book?.category}</h6>
          <p className="mx-1">{book?.review}</p>

          <div className="flex justify-between items-center my-2">
            <p>{book?.pages} pages</p>
          </div>

          <div className="flex justify-between items-center my-2">
            <ProductRating rating={book?.rating}></ProductRating>
          </div>

          <div className="">
            <button
              onClick={() =>
                Swal.fire({
                  title: "Good job!",
                  text: `${book?.bookId} ${book?.bookName} has been successfully added to the Wishlist`,
                  icon: "success",
                })
              }
              className="btn btn-primary btn-outline"
            >
              Wish to Read
            </button>

            <button
              onClick={() =>
                Swal.fire({
                  title: "Good job!",
                  text: `${book?.bookId} ${book?.bookName} has been successfully added to the Cart`,
                  icon: "success",
                })
              }
              className="btn btn-ghost btn-outline mx-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
