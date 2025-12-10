import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";

export default function Register() {
  const { createUserWithEmail, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    photo: null,
    email: "",
    phone: "",
    password: "",
    confirm: "",
    role: "Student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (!form.photo) {
      toast.error("Photo is required");
      return;
    }

    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmail(form.email, form.password);

      const imgForm = new FormData();
      imgForm.append("image", form.photo);

      const imgUploadUrl = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMAGE_HOST_KEY
      }`;
      const imgRes = await fetch(imgUploadUrl, {
        method: "POST",
        body: imgForm,
      });
      const imgData = await imgRes.json();
      const uploadedImageUrl = imgData.data.display_url;

      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            role: form.role,
            image: uploadedImageUrl,
          }),
        }
      );

      const savedUser = await res.json();
      toast.success("Registration successful!");

      if (savedUser.user.role === "Student") navigate("/student");
      else if (savedUser.user.role === "Tutor") navigate("/tutor");
      else if (savedUser.user.role === "Admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
          uid: result.user.uid,
        }),
      });

      const savedUser = await res.json();
      toast.success("Login successful!");

      if (savedUser.user.role === "Student") navigate("/student");
      else if (savedUser.user.role === "Tutor") navigate("/tutor");
      else if (savedUser.user.role === "Admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10 shadow-lg rounded-lg bg-white dark:bg-gray-800 mt-10">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Create Your Tuitron Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Photo
          </label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="file-input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone number"
            className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Select Role
          </label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="select select-bordered w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          >
            <option value="Student">Student</option>
            <option value="Tutor">Tutor</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
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

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 z-10"
            >
              {showConfirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <div className="divider my-4">OR</div>

      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full hover:bg-gray-100 flex items-center justify-center space-x-2"
      >
        Signup with Google
      </button>

      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 dark:text-blue-400">
          Login
        </Link>
      </p>
    </div>
  );
}
