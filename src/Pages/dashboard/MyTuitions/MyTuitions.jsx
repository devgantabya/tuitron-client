import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import TuitionCard from "../../../Components/TuitionCard/TuitionCard";

const MyTuitions = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchTuitions = async () => {
      try {
        const res = await axiosSecure.get("/tuitions", {
          params: { email: user.email },
        });
        // Access the array correctly
        setTuitions(res.data.tuitions || []);
      } catch (err) {
        console.error("Failed to fetch tuitions", err);
        setError("Failed to fetch your tuitions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, [user?.email, axiosSecure]);

  if (authLoading || loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Tuition Posts ({tuitions.length})
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {tuitions.length === 0 ? (
        <p>No tuition posts found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tuitions.map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyTuitions;
