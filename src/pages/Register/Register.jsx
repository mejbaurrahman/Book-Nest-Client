/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context-api/AuthProvider";

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
          displayName: data.name,
          photoURL: data.photoUrl,
        };
        updateUser(userInfo)
          .then((result) => {
            setLoading(false);
            // navigate('/');
            toast.success(`Created a profile!`);
            // console.log(user)
            // logOut();
            navigate("/");
          })
          .catch((error) => {
            setErrorShow(error.message);
            setLoading(false);
          });
      })
      .catch((error) => {
        setErrorShow(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center my-16">
      <div className="lg:w-1/3 md:w-1/3 w-full mx-auto px-2">
        <div>
          <h1>Register</h1>
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
              <span className="label-text">Photo Url</span>
            </label>
            <input
              type="text"
              {...register("photoUrl")}
              placeholder="photoUrl"
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
            <br />
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
  );
}
