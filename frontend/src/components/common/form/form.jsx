import React, { useState } from "react";
import DynamicInput from "./DynamicInput";
import DynamicButton from "./DynamicButton";

export default function DynamicForm({ fields, buttonText, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      {fields.map((field) => (
        <DynamicInput
          key={field.name}
          field={field}
          value={formData[field.name]}
          onChange={handleChange}
        />
      ))}

      <DynamicButton text={buttonText || "Submit"} />
    </form>
  );
}
