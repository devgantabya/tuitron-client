import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-600 dark:text-blue-400" />
            <p>+880 1956-968421</p>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600 dark:text-blue-400" />
            <p>developergantabya@gmail.com</p>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
            <p>Khulna, Bangladesh</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white"
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
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="4"
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 text-gray-900 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
