import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import { getCourseById } from "../../../services/courseService";

export default function CourseDetail() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getCourseById(id)
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load course details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-500 mb-6">{error}</p>
        <Link to="/courses" className="text-blue-600 hover:underline">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-24 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-3xl font-bold">{course.title}</h1>
            <p className="mt-2 text-gray-300">By {course.instructor}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {course.features?.map((f, i) => (
                <span
                  key={i}
                  className="text-sm bg-white/10 px-3 py-1 rounded-full"
                >
                  {f}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-2xl font-bold">
                ₹{course.price ?? "Free"}
              </span>
              <button className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700">
                Enroll Now
              </button>
            </div>
          </div>

          <img
            src={course.thumbnail}
            alt={course.title}
            className="rounded-2xl shadow-lg w-full"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-12 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Course Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {course.description}
          </p>

          {course.syllabus?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Syllabus</h3>
              <ul className="space-y-2">
                {course.syllabus.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="bg-white rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <h3 className="text-lg font-semibold mb-4">This course includes</h3>
          <ul className="space-y-2 text-gray-700">
            {course.features?.map((f, i) => (
              <li key={i}>✔ {f}</li>
            ))}
          </ul>

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700">
            Buy Course
          </button>

          <Link
            to="/courses"
            className="block text-center text-blue-600 mt-4 hover:underline"
          >
            ← Back to Courses
          </Link>
        </aside>
      </div>
    </div>
  );
}
