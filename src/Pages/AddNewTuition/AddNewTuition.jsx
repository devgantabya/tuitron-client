import { useForm } from "react-hook-form";

const AddNewTuition = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddTuition = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Create Tuition Post
        </h2>

        <form
          onSubmit={handleSubmit(handleAddTuition)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex gap-4 items-center">
            <label className="text-base text-gray-700 dark:text-gray-300 flex gap-2 items-center">
              <input
                type="radio"
                {...register("student_gender")}
                value="male"
                className="radio"
                defaultChecked
              />
              Male
            </label>
            <label className="text-base text-gray-700 dark:text-gray-300 flex gap-2 items-center">
              <input
                type="radio"
                {...register("student_gender")}
                value="female"
                className="radio ml-4"
              />
              Female
            </label>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewTuition;
