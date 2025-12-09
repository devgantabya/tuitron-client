import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthContext";
import { FaBook, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";

export default function TuitionDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuition = async () => {
      if (!user) return;

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/tuitions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tuition");

        const data = await res.json();
        setTuition(data || null);
      } catch (err) {
        console.error(err);
        setTuition(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTuition();
  }, [id, user]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!tuition) return <p className="text-center py-10">Tuition not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{tuition.subject}</h1>

      <div className="mt-4 space-y-3">
        <p className="flex items-center gap-2 text-gray-700">
          <FaBook /> Class: {tuition.class_level}
        </p>

        <p className="flex items-center gap-2 text-gray-700">
          <FaMapMarkerAlt /> {tuition.location}
        </p>

        <p className="flex items-center gap-2 text-green-600 font-semibold">
          <FaMoneyBillWave /> {tuition.budget} BDT
        </p>

        {tuition.details && (
          <p className="text-gray-700 mt-3">
            <span className="font-semibold">Details:</span> {tuition.details}
          </p>
        )}

        <p className="mt-2 text-sm">
          <span className="font-semibold">Schedule:</span> {tuition.schedule}
        </p>
      </div>
    </div>
  );
}
