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

  // Temporary static data
  const tutor = {
    name: "Rahim Hasan",
    subject: "Math & Physics",
    experience: "4+ Years",
    rating: 4.8,
    location: "Dhaka, Bangladesh",
    bio: "Dedicated and friendly tutor helping students achieve strong conceptual understanding and exam excellence.",
    skills: [
      "Algebra",
      "Calculus",
      "Physics",
      "SSC/HSC Prep",
      "Conceptual Teaching",
    ],
    preferences: {
      type: "Home & Online Tuition",
      salary: "8,000 - 12,000 BDT",
      availability: "5 days/week",
      areas: ["Uttara", "Banani", "Mirpur"],
    },
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
        <img
          src={`https://api.dicebear.com/7.x/initials/svg?seed=${tutor.name}`}
          alt={tutor.name}
          className="w-32 h-32 rounded-xl border object-cover"
        />

        <div>
          <h1 className="text-3xl font-bold">{tutor.name}</h1>

          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
            <FaBook /> {tutor.subject}
          </p>

          <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 mt-1">
            <FaChalkboardTeacher /> {tutor.experience} Experience
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
          {tutor.bio}
        </p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {tutor.skills.map((skill, index) => (
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
              {tutor.preferences.type}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Expected Salary</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {tutor.preferences.salary}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Availability</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {tutor.preferences.availability}
            </p>
          </div>

          <div className="p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold">Preferred Areas</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {tutor.preferences.areas.map((area, index) => (
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
