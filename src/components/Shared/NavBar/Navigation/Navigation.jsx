import { FcReading } from "react-icons/fc";
/* eslint-disable no-unused-vars */
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../../context-api/AuthProvider";

const navButtonStyle = ({ isActive, isTransitioning }) => {
  return {
    color: isActive ? "text-primary" : "",
    viewTransitionName: isTransitioning ? "slide" : "",
  };
};

export default function NavBar() {
  const navigate = useNavigate();
  const { user, loading, logOut } = useContext(AuthContext);
  console.log(user);
  const handleLogOut = () => {
    return logOut()
      .then((res) => {
        navigate("/login");
      })
      .catch();
  };
  const navBarItems = (
    <>
      <NavLink to="/" style={navButtonStyle}>
        <button className="btn btn-outline border-none px-3 py-3 mx-2">
          Home
        </button>
      </NavLink>

      <NavLink to="/products" style={navButtonStyle}>
        <button className="btn btn-outline border-none px-3 py-3 mx-2">
          Products
        </button>
      </NavLink>
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-52 p-2 shadow"
          >
            {navBarItems}
          </ul>
        </div>
        <Link to="/" className="">
          <div className="flex justify-center items-center">
            <FcReading className="lg:text-5xl md:text-3xl text-2xl font-extralight text-black" />
            <p className="lg:text-3xl text-xl px-2">Book Nest</p>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navBarItems}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex justify-end">
          {user?.uid ? (
            <div className="flex justify-center items-center gap-2">
              <img
                className="lg:w-12 md:w-12 w-full rounded-full"
                src={user?.photoURL}
              />
              <p>{user?.displayName}</p>

              <Link to="/dashboard">
                <button className="btn btn-black btn-outline">Dashboard</button>
              </Link>
              <button
                onClick={handleLogOut}
                className="btn btn-black btn-outline"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-black btn-outline">
                Login/Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
