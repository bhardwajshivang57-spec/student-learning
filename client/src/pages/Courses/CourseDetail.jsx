import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { getCourseById, enrollCourse } from "../../services/courseService";
import { useAuth } from "../../context/AuthContext";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getCourseById(id);
        setCourse(data);

        // simple enrolled check
        if (data?.enrolledStudents?.includes(user?._id)) {
          setEnrolled(true);
        }

      } catch (err) {
        console.error(err);
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setEnrolling(true);
      await enrollCourse(course._id, user.token);
      setEnrolled(true);
      alert("Enrolled successfully 🚀");
    } catch (err) {
      alert(err?.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-6">{error}</p>
        <button
          onClick={() => navigate("/courses")}
          className="bg-blue-600 px-6 py-2 rounded-lg"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Course not found
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-24 py-16">

        {/* HERO SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* LEFT */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {course.title}
            </h1>

            <p className="text-gray-300 mb-6 text-lg">
              By {course.instructor?.name || "Instructor"}
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed max-w-xl">
              {course.description}
            </p>

            <div className="flex items-center gap-8 mb-8">
              <span className="text-4xl font-bold text-blue-400">
                ₹{course.price ?? 0}
              </span>

              <button
                onClick={handleEnroll}
                disabled={enrolling || enrolled}
                className={`px-8 py-3 rounded-xl font-medium transition duration-300
                  ${
                    enrolled
                      ? "bg-green-600 cursor-default"
                      : "bg-blue-600 hover:bg-blue-700 hover:scale-105"
                  }`}
              >
                {enrolled
                  ? "Enrolled ✓"
                  : enrolling
                  ? "Enrolling..."
                  : "Enroll Now"}
              </button>
            </div>

            {course.features?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {course.features.map((f, i) => (
                  <span
                    key={i}
                    className="bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm"
                  >
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-6 shadow-xl">
            <img
              src={
                course.thumbnail ||
                "https://via.placeholder.com/600x400"
              }
              alt={course.title}
              className="rounded-xl w-full object-cover"
            />
          </div>
        </div>

        {/* SYLLABUS */}
        {course.syllabus?.length > 0 && (
          <div className="bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-lg">
            <h2 className="text-2xl font-semibold mb-8">
              Course Syllabus
            </h2>

            <ul className="space-y-4 text-gray-300 text-lg">
              {course.syllabus.map((topic, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className="h-3 w-3 bg-blue-500 rounded-full"></span>
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BACK */}
        <div className="mt-12">
          <Link
            to="/courses"
            className="text-blue-400 hover:text-blue-300 transition"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
