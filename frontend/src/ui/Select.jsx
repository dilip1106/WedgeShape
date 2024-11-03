// components/ui/Select.jsx
import React from "react";

const Select = ({ id, value, onChange, options }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
