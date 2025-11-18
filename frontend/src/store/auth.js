import { create } from "zustand";
import axios from "../api/axiosInstance";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,

  // REGISTER
  register: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("/auth/register", payload);

      const { user, token } = res.data;

      set({ user, token });

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // LOGIN
  login: async (payload) => {
    try {
      set({ loading: true, error: null });

      const res = await axios.post("/auth/login", payload);

      const { user, token } = res.data;

      set({ user, token });

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      set({ error: message });
      throw new Error(message);
    } finally {
      set({ loading: false });
    }
  },

  // LOGOUT
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    set({ user: null, token: null });
  },
}));
