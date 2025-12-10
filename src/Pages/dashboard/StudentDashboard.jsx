import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router";

export default function StudentDashboard() {
  const [tuitions, setTuitions] = useState([]);
  const [selectedTuition, setSelectedTuition] = useState(null);
  const [applications, setApplications] = useState([]);
  const { user, setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    subject: "",
    classLevel: "",
    location: "",
    budget: "",
    schedule: "",
    details: "",
  });

  const navigate = useNavigate();

  const authHeader = useMemo(
    () => ({
      Authorization: `Bearer ${user?.accessToken}`,
      "Content-Type": "application/json",
    }),
    [user?.accessToken]
  );

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createTuition = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/student`, {
        method: "POST",
        headers: authHeader,
        body: JSON.stringify(formData),
      });

      if (!res.ok) return toast.error("Failed to post tuition");

      toast.success("Tuition posted!");
      setFormData({
        subject: "",
        classLevel: "",
        location: "",
        budget: "",
        schedule: "",
        details: "",
      });
      await fetchTuitionsHelper();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTuitionsHelper = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/student`, {
        headers: authHeader,
      });
      const data = await res.json();
      setTuitions(data);
    } catch (err) {
      console.log(err);
    }
  }, [authHeader]);

  const updateTuition = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/student/${id}`,
        {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) return toast.error("Update failed");

      toast.success("Updated successfully!");
      setSelectedTuition(null);
      setFormData({
        subject: "",
        classLevel: "",
        location: "",
        budget: "",
        schedule: "",
        details: "",
      });
      await fetchTuitionsHelper();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTuition = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/student/${id}`,
        {
          method: "DELETE",
          headers: authHeader,
        }
      );

      if (!res.ok) return toast.error("Delete failed");

      toast.success("Deleted");
      await fetchTuitionsHelper();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchApplications = async (tuitionId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/student/${tuitionId}/applications`,
        { headers: authHeader }
      );
      const data = await res.json();

      setApplications(data);
      setSelectedTuition({ _id: tuitionId });
    } catch (err) {
      console.log(err);
    }
  };

  const handleApplication = async (
    tuitionId,
    appId,
    action,
    expectedSalary
  ) => {
    try {
      if (action === "approve") {
        navigate(
          `/checkout?tuitionId=${tuitionId}&applicationId=${appId}&amount=${expectedSalary}`
        );
        return;
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/student/${tuitionId}/applications/${appId}`,
        {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify({ action }),
        }
      );

      if (!res.ok) return toast.error("Action failed");

      toast.success("Application rejected");
      fetchApplications(tuitionId);
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/${user._id}`,
        {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify({ name: user.name, image: user.image }),
        }
      );

      if (!res.ok) return toast.error("Profile update failed");

      toast.success("Profile updated!");
      setUser({ ...user }); // refresh context
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = () => {
    selectedTuition ? updateTuition(selectedTuition._id) : createTuition();
  };

  useEffect(() => {
    fetchTuitionsHelper();
  }, [authHeader, fetchTuitionsHelper]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <div className="mb-6 p-4 border">
        <h2 className="font-semibold mb-2">
          {selectedTuition ? "Edit Tuition" : "Post Tuition"}
        </h2>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="classLevel"
          placeholder="Class"
          value={formData.classLevel}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <input
          type="text"
          name="schedule"
          placeholder="Schedule"
          value={formData.schedule}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <textarea
          name="details"
          placeholder="Additional details"
          value={formData.details}
          onChange={handleInputChange}
          className="border p-2 w-full mb-2"
        />

        <button
          onClick={handleFormSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {selectedTuition ? "Update Tuition" : "Post Tuition"}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">My Tuitions</h2>
      {tuitions.map((t) => (
        <div key={t._id} className="p-4 border mb-2 flex justify-between">
          <div>
            <h3 className="font-semibold">
              {t.subject} ({t.classLevel})
            </h3>
            <p>
              Location: {t.location} | Budget: {t.budget} | Status: {t.status}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedTuition(t);
                setFormData({
                  subject: t.subject,
                  classLevel: t.classLevel,
                  location: t.location,
                  budget: t.budget,
                  schedule: t.schedule || "",
                  details: t.details || "",
                });
              }}
              className="bg-yellow-400 px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTuition(t._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>

            {/* ✅ View Applications */}
            <button
              onClick={() => fetchApplications(t._id)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Applications
            </button>
          </div>
        </div>
      ))}

      {applications.length > 0 && (
        <div className="mt-4 p-4 border">
          <h2 className="font-semibold mb-2">Applications</h2>

          {applications.map((app) => (
            <div key={app._id} className="p-2 border-b flex justify-between">
              <div>
                <p>
                  <strong>{app.name}</strong> | {app.qualifications} |{" "}
                  {app.experience} | Expected: {app.expected_salary}
                </p>
                <p>Status: {app.status}</p>
              </div>

              {app.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleApplication(
                        selectedTuition._id,
                        app._id,
                        "approve",
                        app.expected_salary
                      )
                    }
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      handleApplication(selectedTuition._id, app._id, "reject")
                    }
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 border">
        <h2 className="font-semibold mb-2">Profile Settings</h2>
        <input
          type="text"
          placeholder="Name"
          value={user?.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={user?.image || ""}
          onChange={(e) => setUser({ ...user, image: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleProfileUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
