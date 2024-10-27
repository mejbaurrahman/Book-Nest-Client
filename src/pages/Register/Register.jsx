/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context-api/AuthProvider";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

export default function SignUp() {
  const [errorShow, setErrorShow] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { createUser, user, setUser, loading, setLoading, updateUser, logOut } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignUp = (data) => {
    console.log(data);
    setErrorShow("");

    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        // console.log(user);

        setLoading(true);
        const userInfo = {
          name: data.name,
          email: data.email,
          password: data?.password,
          phone: data.phone,
          role: data.role,
          address: data?.address,
        };
        console.log(userInfo);

        fetch("http://localhost:5000/users", {
          method: "POST", //
          headers: {
            "Content-Type": "application/json", // Inform the server that JSON is being sent
          },
          body: JSON.stringify(userInfo),
        })
          .then((response) => response.json())
          .then((data) => {
            toast.success("Registration Complete!");
            setLoading(false);
            logOut();
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        setErrorShow(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Book Nest | Register</title>
      </Helmet>
      <div className="flex justify-center items-center my-16">
        <div className="lg:w-1/3 md:w-1/3 w-full mx-auto px-2">
          <div>
            <h1 className="text-4xl text-center font-medium">Register</h1>
          </div>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="name"
                className="input input-bordered w-full "
              />
            </div>
            {errors.name?.type === "required" && (
              <p className="text-rose-800" role="alert">
                Name is required
              </p>
            )}
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Phone</span>
              </label>
              <input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                placeholder="Phone Number"
                className="input input-bordered w-full "
              />
            </div>
            {errors.name?.type === "required" && (
              <p className="text-rose-800" role="alert">
                Phone number is required
              </p>
            )}
            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                {...register("address")}
                placeholder="name"
                className="input input-bordered w-full "
              />
            </div>

            <div className="form-control w-full ">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </div>
            {errors.email?.type === "required" && (
              <p className="text-rose-800" role="alert">
                Email is required
              </p>
            )}

            <div className="form-control w-full">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Password"
                className="input input-bordered w-full"
              />
              {errors.password?.type === "required" && (
                <p className="text-rose-800" role="alert">
                  Password is required
                </p>
              )}{" "}
            </div>
            <div className="form-control w-full mb-3">
              <label className="label">
                {" "}
                <span className="label-text">Role</span>
              </label>

              <select
                className="borber border-2 py-2 w-full rounded-md"
                {...register("role")}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-ghost btn-outline">
              Register
            </button>
          </form>
          {errorShow && <p className="text-red-600">{errorShow}</p>}
          <p>
            Already have account{" "}
            <Link to="/login" className="text-primary opacity-70">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
