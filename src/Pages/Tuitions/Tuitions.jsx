import { useEffect, useState } from "react";
import TuitionCard from "../../Components/TuitionCard/TuitionCard";

export default function Tuitions() {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/tuitions`)
      .then((res) => res.json())
      .then((data) => {
        setTuitions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10">Loading tuitions...</p>;

  if (tuitions.length === 0)
    return <p className="text-center py-10">No tuitions available.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tuitions.map((item) => (
        <TuitionCard key={item._id} tuition={item} />
      ))}
    </div>
  );
}
