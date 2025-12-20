import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaStar,
  FaMapMarkerAlt,
  FaBook,
  FaChalkboardTeacher,
  FaEnvelope,
} from "react-icons/fa";

export default function TutorProfile() {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-gray-600">Loading profile...</p>;
  if (!tutor) return <p className="text-gray-600">Tutor not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
        <img
          src={tutor.tutor_image}
          alt={tutor.name}
          className="w-32 h-32 rounded-xl border object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{tutor.name}</h1>

          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
            <FaBook /> {tutor.subjectSpecialization?.join(", ")}
          </p>

          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
            <FaChalkboardTeacher /> {tutor.experienceYears}+ Years Experience
          </p>

          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
            <FaMapMarkerAlt /> {tutor.location}
          </p>

          <div className="flex items-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.round(tutor.rating)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-700 dark:text-gray-300">
              {tutor.rating}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">About Me</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {tutor.about}
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {tutor.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Tuition Preferences</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Tuition Type</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {tutor.tuitionPreferences?.tuitionType}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Expected Salary</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {tutor.tuitionPreferences?.expectedSalary}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Availability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {tutor.tuitionPreferences?.availability}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Preferred Areas</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {tutor.tuitionPreferences?.preferredAreas?.map((area, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-2 mx-auto hover:bg-blue-700">
          <FaEnvelope /> Contact Tutor
        </button>
      </div>
    </div>
  );
}
