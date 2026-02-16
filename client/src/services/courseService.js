import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// 🔹 Get all courses
export const getAllCourses = async ({
  query = "",
  sort = "popular",
  page = 1,
} = {}) => {
  const res = await API.get(
    `/courses?q=${encodeURIComponent(query)}&sort=${sort}&page=${page}`
  );
  return res.data;
};

// 🔹 Get single course
export const getCourseById = async (courseId) => {
  const res = await API.get(`/courses/${courseId}`);
  return res.data;
};

// 🔹 Create course (INSTRUCTOR)
export const createCourse = async (courseData, token) => {
  const res = await API.post(
    "/courses",
    courseData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// 🔹 Get instructor's own courses
export const getMyCourses = async (token) => {
  const res = await API.get("/courses/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔹 Get enrolled courses (Student)
export const getEnrolledCourses = async (token) => {
  const res = await API.get("/courses/enrolled", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

// 🔹 Enroll in course
export const enrollCourse = async (courseId, token) => {
  const res = await API.post(
    `/courses/${courseId}/enroll`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// 🔹 Publish course
export const publishCourse = async (courseId, token) => {
  const res = await API.put(
    `/courses/${courseId}/publish`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
