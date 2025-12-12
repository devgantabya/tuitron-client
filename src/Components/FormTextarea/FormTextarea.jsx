import React from "react";

const FormTextarea = ({ label, name, register, required, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </label>
      <textarea
        rows={4}
        {...register(name, { required })}
        placeholder={placeholder}
        className="p-3 textarea w-full rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
      ></textarea>
    </div>
  );
};

export default FormTextarea;
