import { Link } from "react-router-dom";
import ProductRating from "../../../components/Shared/ProductRating/ProductRating";

/* eslint-disable react/prop-types */
export default function ShowCard(props) {
  const { img, tags, book, author, category, rating, price, _id } = props.book;
  return (
    <div className="card bg-base-100 w-100 pl-0 pr-2 shadow-md">
      <figure>
        <img className="w-full h-52 p-3 rounded-md " src={img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <p>
          {tags?.map((tag) => (
            <span className="text-slate-400 mx-1" key={tag.index}>
              {tag}
            </span>
          ))}
        </p>
        <h2 className="card-title mx-1">{book}</h2>
        <h5 className="mx-1">{author}</h5>
        <h6 className="mx-1">{category}</h6>

        <div className="lg:flex md:flex justify-between items-center">
          <h6 className="mx-1">Price: {price} Taka</h6>
          <ProductRating rating={rating}></ProductRating>
        </div>
        <div className="card-actions justify-end">
          <Link to={`/product/${_id}`}>
            <button className="btn btn-ghost btn-outline">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
