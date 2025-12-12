import React from "react";
import { useForm } from "react-hook-form";
import FormInput from "../../Components/FormInput/FormInput";
import FormSelect from "../../Components/FormSelect/FormSelect";
import FormTextarea from "../../Components/FormTextarea/FormTextarea";

const AddNewTuition = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const formatted = {
      category: data.category,
      course: data.course,
      subject: data.subject,
      days: data.days,
      time: data.time,
      duration: data.duration,
      method: data.method,
      salary: Number(data.salary),
      students: Number(data.students),
      gender: data.gender,
      requirements: {
        category: data.req_category,
        group: data.req_group,
        gender: data.req_gender,
        hiring_from: data.hiring_from,
        other: data.other_requirements,
      },
      contact: {
        country: data.country,
        city: data.city,
        location: data.location,
        address: data.full_address,
      },
    };

    console.log("Formatted:", formatted);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 space-y-8"
      >
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Post a Tuition
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <FormSelect
            label="Category"
            name="category"
            register={register}
            required
            options={["English Version", "Bangla Medium", "English Medium"]}
          />

          <FormInput
            label="Course"
            name="course"
            placeholder="e.g. SSC Candidate"
            register={register}
            required
          />

          <FormInput
            label="Subject"
            name="subject"
            placeholder="Math, Accounting"
            register={register}
            required
          />

          <FormInput
            label="Days"
            name="days"
            register={register}
            placeholder="e.g. 4 days"
            required
          />

          <FormInput
            label="Time"
            name="time"
            register={register}
            placeholder="e.g. 9:00 AM"
            required
          />

          <FormInput
            label="Duration"
            name="duration"
            placeholder="e.g. 2 Hours"
            register={register}
            required
          />

          <FormSelect
            label="Method"
            name="method"
            register={register}
            required
            options={["Home Tutoring", "Online Tutoring"]}
          />

          <FormInput
            label="Salary"
            name="salary"
            placeholder="4000"
            register={register}
            required
          />

          <FormInput
            label="Students"
            name="students"
            placeholder="1"
            register={register}
            required
          />

          <FormSelect
            label="Gender"
            name="gender"
            register={register}
            required
            options={["Male", "Female"]}
          />
        </div>

        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Tutor Requirements
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <FormSelect
            label="Category"
            name="req_category"
            register={register}
            required
            options={["English Version", "Bangla Medium", "English Medium"]}
          />

          <FormSelect
            label="Group"
            name="req_group"
            register={register}
            required
            options={["Science", "Commerce", "Arts"]}
          />

          <FormSelect
            label="Tutor Gender"
            name="req_gender"
            register={register}
            required
            options={["Male", "Female"]}
          />

          <FormInput
            label="Hiring From"
            type="date"
            name="hiring_from"
            register={register}
            required
          />
        </div>

        <FormTextarea
          label="Other Requirement"
          name="other_requirements"
          placeholder="Enter other requirements"
          register={register}
        />

        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Contact Information
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <FormInput
            label="Country"
            name="country"
            placeholder="Bangladesh"
            register={register}
            required
          />
          <FormInput
            label="City"
            name="city"
            placeholder="Dhaka"
            register={register}
            required
          />
          <FormInput
            label="Location"
            name="location"
            placeholder="Mohammadpur"
            register={register}
            required
          />
        </div>

        <FormTextarea
          label="Full Address"
          name="full_address"
          placeholder="Block-B, Road-1/A, Nobodoy Housing Society"
          register={register}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
        >
          Post Tuition
        </button>
      </form>
    </div>
  );
};

export default AddNewTuition;
