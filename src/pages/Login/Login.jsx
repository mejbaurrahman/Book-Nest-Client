/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../context-api/AuthProvider";
import { Helmet } from "react-helmet";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user, login, loading, setLoading, googleLogin, gitHubLogin } =
    useContext(AuthContext);
  const [errorShow, setErrorShow] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    console.log(data);
    setErrorShow("");
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user)
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorShow(error.message);
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    setErrorShow("");
    googleLogin()
      .then((result) => {
        const user = result.user;
        setLoading(true);
        const userInfo = {
          name: user.displayName,
          email: user.email,
          password: user?.password,
          phone: user?.phone,
          role: "user",
          address: user?.address,
          img: user?.photoURL,
        };
        fetch("http://localhost:5000/users", {
          method: "POST", //
          headers: {
            "Content-Type": "application/json", // Inform the server that JSON is being sent
          },
          body: JSON.stringify(userInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(from, { replace: true });
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        setErrorShow(error.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Book Nest | Login</title>
      </Helmet>
      <div className="flex justify-center items-center my-16">
        <div className="lg:w-1/3 md:w-1/3 w-full px-2 mx-auto">
          <div>
            <h1 className="text-4xl text-center font-medium">Login</h1>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="name"
                >
                  Email
                </label>
                <input
                  className="input input-bordered w-full"
                  id="email"
                  type="email"
                  placeholder="*@*.com"
                  {...register("email", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic">
                    Email is required
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Password
                </label>
                <input
                  className="input input-bordered w-full"
                  id="password"
                  type="password"
                  placeholder="*******"
                  {...register("password", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    Paasword is required
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-ghost btn-outline w-full"
              >
                Login
              </button>
            </form>
            <div className="my-2">
              <p className="">
                New User?{" "}
                <Link className="text-primary opacity-70" to="/register">
                  Register
                </Link>
              </p>
            </div>
            <div className="divider">OR</div>
            <div className="flex lg:justify-center md:justify-center lg:flex-row flex-col items-center">
              <button
                onClick={handleGoogleLogin}
                type="submit"
                className="btn btn-ghost text-xl btn-outline my-2 py-3 px-7 w-1/3"
              >
                <FaGoogle />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
