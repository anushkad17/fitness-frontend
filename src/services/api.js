import axios from "axios";

// ✅ Base URL from env
const BASE_URL = import.meta.env.VITE_API_URL;

// ❗ Safety check
if (!BASE_URL) {
  console.error(" VITE_API_URL is not defined");
}

// ✅ Ensure no trailing slash issues
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

// ✅ Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Global error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "API ERROR:",
      error?.response?.status,
      error?.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// ================= APIs =================

export const getActivities = () => api.get("/activities");

export const addActivity = (activity) =>
  api.post("/activities", activity);

export const getActivityDetail = (id) =>
  api.get(`/recommendations/activity/${id}`);

export const getActivityById = (id) =>
  api.get(`/activities/${id}`);

// =======================================

export default api;