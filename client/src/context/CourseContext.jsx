import { createContext, useContext, useState } from "react";
import {
  getAllCourses,
  getCourseById,
} from "../services/courseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch all courses
  const fetchCourses = async ({ query = "", sort = "popular", page = 1 } = {}) => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllCourses({ query, sort, page });
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch single course
  const fetchCourseById = async (courseId) => {
    try {
      setLoading(true);
      setError("");
      const data = await getCourseById(courseId);
      setCurrentCourse(data);
      return data;
    } catch (err) {
      console.error(err);
      setError("Failed to load course");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        currentCourse,
        loading,
        error,
        fetchCourses,
        fetchCourseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

// 🔹 Custom hook (clean usage)
export const useCourses = () => useContext(CourseContext);
