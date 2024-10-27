import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowCard from "./ShowCard/ShowCard";

export default function Products() {
  const [books, setBooks] = useState([]);
  let { category } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("https://book-nest-server-eight.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // setBooks(data);
        if (category) {
          const products = data.filter((book) => book.category === category);
          setBooks(products);
          setLoading(false);
        } else {
          setBooks(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 mt-10">
      {!loading ? (
        books?.map((book) => <ShowCard key={book._id} book={book}></ShowCard>)
      ) : (
        <div className="flex justify-center items-center">
          <div className="skeleton h-32 w-32 "></div>
        </div>
      )}
    </div>
  );
}
