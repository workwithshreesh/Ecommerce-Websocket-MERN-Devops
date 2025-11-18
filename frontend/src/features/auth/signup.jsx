import React from "react";
import DynamicForm from "../../components/common/form/form";
import signupForm from "../../components/common/form-configs/registerForm";
import { useAuthStore } from "../../store/auth";

export default function Signup() {
  const register = useAuthStore((state) => state.register);
  const loading = useAuthStore((state) => state.loading);
  const error = useAuthStore((state) => state.error);

  const handleRegister = async (data) => {
    try {
      await register(data);
      alert("Signup successful!");
    } catch (err) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        
        <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

        {error && (
          <p className="text-red-500 text-center mb-3">{error}</p>
        )}

        <DynamicForm
          fields={signupForm}
          buttonText={loading ? "Creating Account..." : "Sign Up"}
          onSubmit={handleRegister}
        />
      </div>
    </div>
  );
}
