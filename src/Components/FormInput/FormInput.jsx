import React from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  required,
  placeholder,
}) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </label>
      <input
        type={type}
        {...register(name, { required })}
        placeholder={placeholder}
        className="input input-bordered w-full pr-12 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
      />
    </div>
  );
};

export default FormInput;
