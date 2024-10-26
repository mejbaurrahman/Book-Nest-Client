/* eslint-disable react/prop-types */
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

const ProductRating = ({ rating }) => {
  return (
    <div>
      <Rating
        emptySymbol={<FaStar color="#ccc" size={24} />}
        fullSymbol={<FaStar color="red" size={24} />}
        initialRating={rating}
        readonly
      />
    </div>
  );
};

export default ProductRating;
