/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../../context-api/AuthProvider";
import { useRoleCheck } from "../../hooks/useRoleCheck";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaCartShopping } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import { IoMdLogOut } from "react-icons/io";

export default function Dashboard() {
  const { user, logOut } = useContext(AuthContext);
  const [loggedUser, loading] = useRoleCheck(user.email);
  return (
    <>
      <Helmet>
        <title>Book Nest | Dashboard</title>
      </Helmet>
      {!loading && (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              Open drawer
            </label>

            <Outlet />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-black text-white  min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li className="mb-2">
                <div className="mb-2">
                  {loggedUser?.img ? (
                    <img
                      src={loggedUser?.img}
                      alt=""
                      className="w-1/3 rounded-full"
                    />
                  ) : (
                    <CgProfile className="text-green-400 text-7xl" />
                  )}
                </div>
              </li>
              <li>
                <a>{loggedUser?.name}</a>
              </li>
              <li>
                <a>{loggedUser?.email}</a>
              </li>
              <nav className="mt-10">
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <span className="mr-3">🏠</span>
                  Home
                </Link>

                {user?.email && loggedUser?.role == "admin" ? (
                  <>
                    <Link
                      to="/dashboard/allUsers"
                      className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <span className="mr-3">📚</span>
                      All Users
                    </Link>

                    <Link
                      to="/dashboard/allCategories"
                      className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <span className="mr-3">✍️</span>
                      All Categories
                    </Link>
                    <Link
                      to="/dashboard/allProducts"
                      className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <span className="mr-3">✍️</span>
                      All Products
                    </Link>
                    <Link
                      to="/dashboard/addCategory"
                      className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <span className="mr-3">✍️</span>
                      Add Category
                    </Link>
                    <Link
                      to="/dashboard/addProduct"
                      className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      <span className="mr-3">✍️</span>
                      Add Product
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/dashboard/carts"
                    className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    <span className="mx-1 text-orange-300">
                      <FaCartShopping />
                    </span>
                    My Carts
                  </Link>
                )}
              </nav>
              <div className="mt-auto">
                <Link
                  to="/dashboard/profileEdit"
                  className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <span className="mr-3">🚪</span>
                  Profile Edit
                </Link>
              </div>

              <btn onClick={logOut} className="btn btn-outline btn-error">
                <IoMdLogOut /> Logout
              </btn>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
