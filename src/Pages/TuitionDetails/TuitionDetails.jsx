import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { FaMapMarkerAlt, FaBook, FaMoneyBillWave } from "react-icons/fa";

export default function TuitionDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    qualifications: "",
    experience: "",
    expectedSalary: "",
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tuitions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTuition(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!tuition) return <p className="text-center py-10">Tuition not found</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      tutorName: user.name,
      tutorEmail: user.email,
      qualifications: form.qualifications,
      experience: form.experience,
      expectedSalary: form.expectedSalary,
      tuitionId: id,
      status: "Pending",
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.insertedId) {
      alert("Application submitted successfully!");
      setOpenModal(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">{tuition.subject}</h1>

      <div className="mt-4 space-y-3">
        <p className="flex items-center gap-2 text-gray-700">
          <FaBook /> Class: {tuition.classLevel}
        </p>

        <p className="flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt /> {tuition.location}
        </p>

        <p className="flex items-center gap-2 text-green-600 font-semibold">
          <FaMoneyBillWave /> {tuition.budget} BDT
        </p>

        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Details:</span> {tuition.details}
        </p>
      </div>

      {user?.role === "Tutor" && (
        <button
          onClick={() => setOpenModal(true)}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Apply for This Tuition
        </button>
      )}

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Apply as Tutor</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                value={user.name}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />

              <input
                type="email"
                value={user.email}
                readOnly
                className="w-full border p-2 rounded bg-gray-100"
              />

              <input
                type="text"
                placeholder="Qualifications"
                value={form.qualifications}
                onChange={(e) =>
                  setForm({ ...form, qualifications: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Experience (e.g. 3 Years)"
                value={form.experience}
                onChange={(e) =>
                  setForm({ ...form, experience: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Expected Salary"
                value={form.expectedSalary}
                onChange={(e) =>
                  setForm({ ...form, expectedSalary: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
