import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context-api/AuthProvider";

export default function ShowCarts() {
  const [carts, setCarts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(null);
  useEffect(() => {
    setLoading(true);
    fetch(`https://book-nest-server-eight.vercel.app/carts/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // setBooks(data);

        const totalPrice = data.reduce((acc, book) => {
          return acc + book.price;
        }, 0);
        setTotal(totalPrice);
        setCarts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="lg:w-3/4 md:w-full mx-auto mt-6">
      <h2 className="text-2xl text-center uppercase">Carts</h2>
      <h2 className="text-2xl  text-center font-semibold mb-6">
        Total Amount of Cost : {total} Taka
      </h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="w-full bg-gray-200 text-left text-gray-600">
            <th className="py-2 px-4 border">#</th>
            <th className="py-2 px-4 border">Image</th>
            <th className="py-2 px-4 border">Book Name</th>
            <th className="py-2 px-4 border">Price</th>
            <th className="py-2 px-4 border">Pay</th>
          </tr>
        </thead>
        <tbody>
          {carts?.length > 0 && !loading ? (
            carts?.map((cart, index) => (
              <tr key={cart._id} className="border-t">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 lg:w-1/5 md:w-1/4 w-1/3  border">
                  <img src={cart?.img} className=" rounded-lg" />
                </td>
                <td className="py-2 px-4 border">{cart?.bookName}</td>
                <td className="py-2 px-4 border">{cart?.price}</td>

                <td className="py-2 px-4 border">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Pay
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-2 px-4 border text-center" colSpan={2}>
                No Users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
