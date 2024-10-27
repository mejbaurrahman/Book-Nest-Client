import ProductRating from "../../../components/Shared/ProductRating/ProductRating";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuyProduct from "../BuyProduct/BuyProduct";

export default function ProductDetail() {
  console.log("ProductDetail");
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = useParams();
  console.log(_id);
  const [modalData, setModalData] = useState(null);
  const handleButtonClick = (id) => {
    console.log(id);
    const data = id;
    setModalData(data); // Set data to open the modal with specific content
  };

  const closeModal = () => {
    setModalData(null); // Clear data to close the modal
  };
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/products/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBook(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [_id]);
  return (
    <>
      {!loading ? (
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
                <p>{book?.price} Taka</p>
                <ProductRating rating={book?.rating}></ProductRating>
              </div>

              <div className="">
                <button
                  //
                  onClick={() => handleButtonClick(book._id)}
                  className="btn btn-ghost btn-outline"
                >
                  Buy Now
                </button>
                <BuyProduct data={modalData} onClose={closeModal} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <div className="skeleton h-32 w-32 "></div>
        </div>
      )}
    </>
  );
}
