import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ApplyModal = ({ tuition, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosSecure.post("/applications", {
        tuitionId: tuition._id,
        message,
      });

      if (res.data?.success) {
        alert("Application submitted successfully!");
        onClose();
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-2xl transition-colors duration-300">
        <div className="px-5 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-text-light-main dark:text-text-dark-main">
            Apply for Tuition
          </h2>
          <p className="text-xs sm:text-sm text-text-light-sub dark:text-text-dark-sub mt-1">
            Review the details before submitting your application
          </p>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-700/50 p-4">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Subject
              </p>
              <p className="mt-1 text-sm text-text-light-main dark:text-text-dark-main">
                {tuition.subject}
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Salary
              </p>
              <p className="mt-1 text-sm text-text-light-main dark:text-text-dark-main">
                {tuition.salary} TK
              </p>
            </div>

            <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Days
              </p>
              <p className="mt-1 text-sm text-text-light-main dark:text-text-dark-main">
                {tuition.days}
              </p>
            </div>
          </div>

          <form onSubmit={handleApply} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text-light-main dark:text-text-dark-main mb-1">
                Message for Guardian
              </label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Briefly introduce yourself and your experience..."
                className="w-full min-h-[120px] rounded-xl border border-gray-300 dark:border-gray-700 bg-transparent p-3 text-sm text-text-light-main dark:text-text-dark-main placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 text-sm font-semibold text-text-light-main dark:text-text-dark-main hover:bg-gray-100 dark:hover:bg-gray-700 transition disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
              >
                {loading ? "Applying..." : "Apply Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
