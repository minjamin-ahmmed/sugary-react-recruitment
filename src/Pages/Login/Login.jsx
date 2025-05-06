import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
  
  };

  return (
    <div className="w-11/12 lg:w-7/12 mx-auto flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-zinc-950 mb-4">
          Login
        </h2>
        <p className="text-center text-zinc-600 mb-6">
          Please enter your credentials to access your account.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-950 transition ${
                errors.email ? "border-red-500" : "border-zinc-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-950 transition ${
                errors.password ? "border-red-500" : "border-zinc-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-zinc-950 text-white px-6 py-2 rounded-full font-medium hover:bg-zinc-800 transition-all duration-200 ease-in-out transform hover:scale-95"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
