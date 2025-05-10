import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const storeTokens = (responseData) => {
    localStorage.setItem("accessToken", responseData.Token);
    localStorage.setItem("refreshToken", responseData.RefreshToken);

    if (responseData.AccessTokenExpiresAt) {
      localStorage.setItem(
        "accessTokenExpiresAt",
        responseData.AccessTokenExpiresAt
      );
    }
    if (responseData.RefreshTokenExpiresAt) {
      localStorage.setItem(
        "refreshTokenExpiresAt",
        responseData.RefreshTokenExpiresAt
      );
    }
  };

  const showSuccessToast = () => {
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
  };

  const showErrorToast = (
    message = "Login failed. Please check your credentials."
  ) => {
    toast.error(message, {
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
  };

  const onSubmit = async (data) => {
    const body = {
      UserName: data.UserName,
      Password: data.Password,
    };

    try {
      const response = await axiosInstance.post(
        "https://sugarytestapi.azurewebsites.net/AdminAccount/Login",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      storeTokens(response.data);

      console.log("Login successful:", response.data);
      showSuccessToast();
      reset();
      navigate("/dashboard");
    } catch (error) {
      let errorMessage = "Login failed. Please check your credentials.";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      showErrorToast(errorMessage);
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
              {...register("UserName", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
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
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
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
            className={`w-full bg-zinc-950 text-white py-2 rounded-full font-medium hover:scale-95 active:scale-90 transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
