import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "../pages/Signup";
import Login from "../pages/Login";
// import Home from "../pages/Home";
// import Dashboard from "../pages/Dashboard";
// import AdminDashboard from "../pages/AdminDashboard";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}

    </Routes>
  );
}
