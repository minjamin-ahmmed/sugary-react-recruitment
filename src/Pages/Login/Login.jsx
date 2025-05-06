import axios from "axios";
import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const body = {
      UserName: data.UserName,
      Password: data.Password,
    };

    try {
      const response = await axios.post(
        "https://sugarytestapi.azurewebsites.net/AdminAccount/Login",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login successful:", response.data);
      toast.success("Login successful!", {
        position: "top-center",
        icon: <CheckCircle className="text-green-500" />,
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "16px",
          padding: "14px 20px",
        },
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        icon: <AlertCircle className="text-red-500" />,
        style: {
          borderRadius: "12px",
          background: "#1a1a1a",
          color: "#fff",
          fontSize: "16px",
          padding: "14px 20px",
        },
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-11/12 lg:w-7/12 mx-auto flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-zinc-200">
        <h2 className="text-3xl font-semibold text-center text-zinc-950 mb-4">
          Login
        </h2>
        <p className="text-center text-zinc-600 mb-6">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("UserName", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
            />
            {errors.UserName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.UserName.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("Password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-zinc-300 rounded focus:outline-none focus:ring-2 focus:ring-zinc-950"
            />
            {errors.Password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-950 text-white py-2 rounded-full font-medium hover:scale-95 active:scale-90 transition cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
