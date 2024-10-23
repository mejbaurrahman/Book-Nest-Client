/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AuthContext } from "../../context-api/AuthProvider";
import { useRoleCheck } from "../../hooks/useRoleCheck";
import { Link, Outlet } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [role, loading] = useRoleCheck(user.email);
  return (
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
        <div>WELCOME TO BOOK NEST</div>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <a>{user?.email}</a>
          </li>
          <li>
            <a>Profile Edit</a>
          </li>
          <nav className="mt-10">
            <Link
              to="/"
              className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <span className="mr-3">🏠</span>
              Home
            </Link>

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
          </nav>
          <div className="mt-auto">
            <Link
              to="/logout"
              className="flex items-center px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <span className="mr-3">🚪</span>
              Logout
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
