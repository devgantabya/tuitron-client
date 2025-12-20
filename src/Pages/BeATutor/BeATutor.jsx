import { useForm } from "react-hook-form";
import useAuth from "./../../hooks/useAuth";
import { useNavigate } from "react-router";
import useAxiosSecure from "./../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const BeATutor = () => {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleBeTutor = (data) => {
    const tutorData = {
      name: data.name,
      tutor_email: data.tutor_email,
      tutor_image: data.tutor_image,
      subjectSpecialization: data.subjectSpecialization.split(","),
      experienceYears: Number(data.experienceYears),
      location: `${data.city}, ${data.country}`,
      rating: Number(data.rating || 0),
      about: data.about,
      skills: data.skills.split(","),
      tuitionPreferences: {
        tuitionType: data.tuitionType,
        expectedSalary: data.expectedSalary,
        availability: data.availability,
        preferredAreas: data.preferredAreas.split(","),
      },
    };

    axiosSecure.post("/tutors", tutorData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Tutor profile has been submitted. We will review it soon!",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
    });

    console.log(data);
    console.log(tutorData);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit(handleBeTutor)}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Become a Tutor
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              defaultValue={user?.displayName}
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("tutor_email")}
              defaultValue={user?.email}
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Profile Image URL
            </label>
            <input
              type="text"
              {...register("tutor_image")}
              placeholder="https://"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Subjects
            </label>
            <input
              type="text"
              {...register("subjectSpecialization")}
              placeholder="Math, Programming"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Experience (Years)
            </label>
            <input
              type="number"
              {...register("experienceYears")}
              placeholder="4"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Rating
            </label>
            <input
              type="number"
              {...register("rating")}
              step="0.1"
              placeholder="4.5"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            About Yourself
          </label>
          <textarea
            {...register("about")}
            placeholder="Describe your teaching experience"
            className="px-3 mt-2 textarea w-full rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          ></textarea>
        </div>

        <div>
          <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Skills
          </label>
          <input
            type="text"
            {...register("skills")}
            placeholder="HTML, CSS, JavaScript"
            className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Tuition Preferences
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Tuition Type
            </label>
            <select
              {...register("tuitionType")}
              className="p-2 mt-2 rounded w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            >
              <option value="">Select</option>
              <option value="Online Tuition">Online Tuition</option>
              <option value="Home Tuition">Home Tuition</option>
            </select>
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Expected Salary
            </label>
            <input
              type="text"
              {...register("expectedSalary")}
              placeholder="10000 - 15000 BDT"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Availability
            </label>
            <input
              type="text"
              {...register("availability")}
              placeholder="4 days/week"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Preferred Areas
            </label>
            <input
              type="text"
              {...register("preferredAreas")}
              placeholder="Mirpur, Dhanmondi, Online"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Location Information
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              City
            </label>
            <input
              type="text"
              {...register("city")}
              placeholder="Dhaka"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Country
            </label>
            <input
              type="text"
              {...register("country")}
              placeholder="Bangladesh"
              className="input input-bordered w-full px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Submit Tutor Profile
        </button>
      </form>
    </div>
  );
};

export default BeATutor;
