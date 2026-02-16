import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as courseService from "../../services/courseService";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function MyCourses() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (!user) return;

        const data = await courseService.getEnrolledCourses(user.token);
        setCourses(data || []);
      } catch (error) {
        console.error("MY COURSES ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-7xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-semibold mb-10">
          My Courses
        </h1>

        {courses.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-300 text-lg">
              You haven’t enrolled in any course yet.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 border border-white/10 backdrop-blur-xl overflow-hidden hover:scale-[1.03] transition duration-300"
              >
                <div className="h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30"></div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-400 mb-4">
                    {course.description?.slice(0, 80)}...
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/learn/${course._id}`)
                    }
                    className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-sm"
                  >
                    Continue Learning →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
