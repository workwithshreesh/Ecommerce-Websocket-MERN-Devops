import axiosClient from "./axiosClient";

const authService = {
  // === REGISTER ===
  register: async (userData) => {
    const res = await axiosClient.post("/auth/register", userData);
    return res.data;
  },

  // === LOGIN ===
  login: async (credentials) => {
    const res = await axiosClient.post("/auth/login", credentials);

    // Save token in localStorage
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
    }

    return res.data;
  },

  // === LOGOUT ===
  logout: () => {
    localStorage.removeItem("token");
  },

  // === GET CURRENT USER ===
  me: async () => {
    const res = await axiosClient.get("/auth/me");
    return res.data;
  }
};

export default authService;
