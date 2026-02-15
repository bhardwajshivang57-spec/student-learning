import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  getMyCourses,
  getEnrolledCourses,
} from "../../services/courseService";

export default function Profile() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInstructor =
    user?.role === "instructor" || user?.role === "teacher";

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);

        if (isInstructor) {
          const data = await getMyCourses(user.token);
          setCourses(data || []);
        } else {
          const data = await getEnrolledCourses(user.token);
          setCourses(data || []);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      loadCourses();
    }
  }, [isInstructor, user]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-20 py-16">
        {/* PROFILE CARD */}
        <div className="bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-2">
                {user?.name}
              </h2>
              <p className="text-gray-300">{user?.email}</p>
              <p className="mt-2 text-sm bg-white/10 inline-block px-3 py-1 rounded-full capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <StatCard
            label="Role"
            value={user?.role}
            emoji="🎓"
          />
          <StatCard
            label={
              isInstructor
                ? "Courses Created"
                : "Courses Enrolled"
            }
            value={courses.length}
            emoji="📘"
          />
          <StatCard
            label="Status"
            value={
              isInstructor
                ? "Instructor Mode"
                : "Learning Mode"
            }
            emoji="⚡"
          />
        </div>

        {/* COURSE SECTION */}
        <div className="mt-14 bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold mb-6">
            {isInstructor
              ? "Your Created Courses"
              : "Your Learning Courses"}
          </h3>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-400">
              No courses found.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 hover:scale-[1.02] transition"
                >
                  <h4 className="font-semibold mb-2">
                    {course.title}
                  </h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {course.description?.slice(0, 60)}...
                  </p>

                  <Link
                    to={`/courses/${course._id}`}
                    className="text-blue-400 text-sm hover:underline"
                  >
                    View Course →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* Small reusable card */
const StatCard = ({ label, value, emoji }) => (
  <div className="bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-xl font-semibold capitalize mt-1">
        {value}
      </p>
    </div>
    <span className="text-2xl">{emoji}</span>
  </div>
);
