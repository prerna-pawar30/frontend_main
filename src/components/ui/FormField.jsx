import React from "react";

const FormField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = true,
  isTextArea = false,
  className = "",
}) => {
  const baseClasses = `mt-2 w-full border rounded-lg px-3 py-3 cursor-text max-w-[600px] transition-all duration-300 ${
    error
      ? "border-red-500 hover:shadow-[0_0_25px_rgba(220,38,38,0.35)]"
      : "border-gray-300 hover:shadow-[0_0_25px_rgba(230,135,54,0.35)]"
  }`;

  return (
    <div className={className}>
      <label className="block text-[18px] font-medium">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="5"
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={baseClasses}
        />
      )}
      
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormField;