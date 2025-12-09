import { useEffect, useState } from "react";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";

export default function Tuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/tuitions`;

        const res = await fetch(url); // ✔ No token, no headers

        if (!res.ok) throw new Error("Failed to fetch tuitions");

        const data = await res.json();
        setTuitions(data.tuitions || []);
      } catch (err) {
        console.error(err);
        setTuitions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  if (loading) return <p className="text-center py-10">Loading tuitions...</p>;
  if (!tuitions || tuitions.length === 0)
    return <p className="text-center py-10">No tuitions available.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tuitions.map((item) => (
        <TuitionCard key={item._id} tuition={item} />
      ))}
    </div>
  );
}
