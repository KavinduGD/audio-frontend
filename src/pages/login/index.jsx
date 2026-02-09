import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === "kavidudharmasiri90@gmail.com" &&
      password === "WinstonK123"
    ) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F2F3F3] dark:bg-[#16191F] font-amazon_ember">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-[#21252C] rounded shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
        <h2 className="mb-6 text-2xl font-normal text-black dark:text-white">
          Sign in
        </h2>
        {error && (
          <div className="mb-4 p-3 text-sm text-error_red border border-error_red rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-bold text-gray-700 dark:text-dark_grey"
            >
              Email (phone for mobile accounts)
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-button_yellow focus:ring-1 focus:ring-button_yellow dark:bg-white dark:text-black"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 dark:text-dark_grey"
              >
                Password
              </label>
              <a href="#" className="text-sm text-text_blue hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-button_yellow focus:ring-1 focus:ring-button_yellow dark:bg-white dark:text-black"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-1.5 text-sm font-normal text-black bg-button_yellow rounded hover:bg-yellow-400 focus:outline-none shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_1px_0_rgba(0,0,0,0.2)]"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 text-xs text-center text-gray-600 dark:text-gray-400">
          <p>
            New to Audio?{" "}
            <a href="#" className="text-text_blue hover:underline">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
