import React from "react";

const FormSelect = ({ label, name, register, options = [], required }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </label>
      <select
        {...register(name, { required })}
        className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
