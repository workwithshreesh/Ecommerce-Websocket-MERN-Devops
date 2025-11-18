import React from "react";

export default function DynamicInput({ field, value, onChange }) {
  const { type, name, placeholder, label, options, required } = field;

  // text, email, password etc.
  if (
    ["text", "email", "password", "number", "date"].includes(type)
  ) {
    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
    );
  }

  // Select input
  if (type === "select") {
    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium">{label}</label>
        <select
          name={name}
          value={value || ""}
          required={required}
          onChange={(e) => onChange(name, e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="">Select {label}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  // Textarea
  if (type === "textarea") {
    return (
      <div className="mb-4">
        <label className="block mb-1 font-medium">{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          className="border rounded px-3 py-2 w-full"
        />
      </div>
    );
  }

  return null;
}
