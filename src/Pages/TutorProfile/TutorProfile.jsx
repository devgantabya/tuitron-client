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
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p className="text-center py-20 text-gray-600 dark:text-gray-400">
        Loading profile...
      </p>
    );

  if (!tutor)
    return (
      <p className="text-center py-20 text-gray-600 dark:text-gray-400">
        Tutor not found.
      </p>
    );

  return (
    <main className="bg-blue-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <img
              src={tutor.tutor_image}
              alt={tutor.name}
              className="w-32 h-32 rounded-2xl object-cover shadow-md"
            />

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {tutor.name}
              </h1>

              <p className="mt-2 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FaBook className="text-blue-500" />
                {tutor.subjectSpecialization?.join(", ")}
              </p>

              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FaChalkboardTeacher className="text-blue-500" />
                {tutor.experienceYears}+ Years Experience
              </p>

              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <FaMapMarkerAlt className="text-blue-500" />
                {tutor.location}
              </p>

              <div className="flex items-center gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < Math.round(tutor.rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {tutor.rating}
                </span>
              </div>
            </div>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            {tutor.about}
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {tutor.skills?.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Tuition Preferences
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              ["Tuition Type", tutor.tuitionPreferences?.tuitionType],
              ["Expected Salary", tutor.tuitionPreferences?.expectedSalary],
              ["Availability", tutor.tuitionPreferences?.availability],
            ].map(([label, value], idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {label}
                </h3>
                <p className="mt-1 text-gray-600 dark:text-gray-300">{value}</p>
              </div>
            ))}

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-5">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Preferred Areas
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {tutor.tuitionPreferences?.preferredAreas?.map(
                  (area, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-lg text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {area}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg">
            <FaEnvelope /> Contact Tutor
          </button>
        </div>
      </div>
    </main>
  );
}
