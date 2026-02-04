import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// 🔹 Get all courses
export const getAllCourses = async ({ query = "", sort = "popular", page = 1 }) => {
  const res = await API.get(
    `/courses?q=${encodeURIComponent(query)}&sort=${sort}&page=${page}`
  );
  return res.data;
};

// 🔹 Get single course by ID
export const getCourseById = async (courseId) => {
  const res = await API.get(`/courses/${courseId}`);
  return res.data;
};
