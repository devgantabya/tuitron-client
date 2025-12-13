import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const StudentDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTuitions = async () => {
      try {
        const res = await axiosSecure.get("/tuitions", {
          params: { email: user.email },
        });
        setTuitions(res.data);
      } catch (error) {
        console.error("Failed to fetch tuitions", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchTuitions();
  }, [user?.email, axiosSecure]);

  if (loading || dataLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Tuition Posts ({tuitions.length})
      </h2>

      {tuitions.length === 0 ? (
        <p>No tuition posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tuitions.map((tuition) => (
            <div key={tuition._id} className="border rounded-lg p-4 shadow">
              <h3 className="font-semibold text-lg mb-1">{tuition.subject}</h3>

              <p>
                <strong>Course:</strong> {tuition.course}
              </p>
              <p>
                <strong>Category:</strong> {tuition.category}
              </p>
              <p>
                <strong>Days:</strong> {tuition.days}
              </p>
              <p>
                <strong>Time:</strong> {tuition.time}
              </p>
              <p>
                <strong>Salary:</strong> ৳{tuition.salary}
              </p>
              <p>
                <strong>Status:</strong> Pending
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
