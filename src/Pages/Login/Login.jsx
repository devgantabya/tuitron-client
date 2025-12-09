import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function Login() {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const userCredential = await signInUser(email, password);
      const token = await userCredential.user.getIdToken();

      const res = await fetch(`http://localhost:5000/users/role/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const roleData = await res.json();

      toast.success("Login successful!");

      if (roleData.role === "Student") navigate("/student-dashboard");
      else if (roleData.role === "Tutor") navigate("/tutor-dashboard");
      else if (roleData.role === "Admin") navigate("/admin-dashboard");
      else navigate(from);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const token = await result.user.getIdToken();

      const res = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        }),
      });
      const savedUser = await res.json();
      toast.success("Login successful!");

      if (savedUser.user.role === "Student") navigate("/student-dashboard");
      else if (savedUser.user.role === "Tutor") navigate("/tutor-dashboard");
      else if (savedUser.user.role === "Admin") navigate("/admin-dashboard");
      else navigate(from);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Google login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Login to Tuitron
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="relative">
          <label className="label">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Email
            </span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 z-10"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      <div className="divider my-4">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full hover:bg-gray-100 flex items-center justify-center space-x-2"
      >
        Login with Google
      </button>

      <div className="mt-4">
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 dark:text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
