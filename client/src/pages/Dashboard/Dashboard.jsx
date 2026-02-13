import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as courseService from "../../services/courseService";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await courseService.getAllCourses({});
        setCourses(data.courses || []);
      } catch (e) {
        console.log(e);
      }
    };
    loadCourses();
  }, []);

  const isTeacher =
    user?.role === "teacher" || user?.role === "instructor";

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative max-w-7xl mx-auto px-8 py-10 text-white">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-gray-300 mt-2">
            Welcome back,{" "}
            <span className="font-medium">{user?.name}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Role" value={user?.role} emoji="🎓" />
          <StatCard
            label={isTeacher ? "Total Courses Created" : "Total Courses"}
            value={courses.length}
            emoji="📘"
          />
          <StatCard
            label="Status"
            value={isTeacher ? "Instructor Mode" : "Learning Active"}
            emoji="⚡"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT MAIN */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-6">
            {/* ===== TEACHER DASHBOARD ===== */}
            {isTeacher ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Your Created Courses
                  </h2>
                  <Link
                    to="/create-course"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                  >
                    + Create Course
                  </Link>
                </div>

                {courses.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-300 mb-6">
                      You haven’t created any courses yet
                    </p>
                    <Link
                      to="/create-course"
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
                    >
                      Create Your First Course
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        actionLabel="Manage Course"
                        onClick={() =>
                          navigate(`/courses/${course._id}`)
                        }
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* ===== STUDENT DASHBOARD ===== */
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">
                    Your Courses
                  </h2>
                  <button
                    onClick={() => navigate("/courses")}
                    className="text-sm text-blue-400 hover:underline"
                  >
                    Browse courses →
                  </button>
                </div>

                {courses.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-300 mb-6">
                      You haven’t enrolled in any courses yet
                    </p>
                    <button
                      onClick={() => navigate("/courses")}
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium"
                    >
                      Explore Courses
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <CourseCard
                        key={course._id}
                        course={course}
                        actionLabel="Continue Learning →"
                        onClick={() =>
                          navigate(`/learn/${course._id}`)
                        }
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              💡 {isTeacher ? "Instructor Tips" : "Quick Tips"}
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              {isTeacher ? (
                <>
                  <li>• Create structured lessons</li>
                  <li>• Keep course descriptions clear</li>
                  <li>• Update content regularly</li>
                  <li>• Engage with students</li>
                </>
              ) : (
                <>
                  <li>• Review your notes regularly</li>
                  <li>• Participate in discussions</li>
                  <li>• Practice coding daily</li>
                  <li>• Set learning goals</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===== Small reusable components ===== */

const StatCard = ({ label, value, emoji }) => (
  <div className="rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 px-6 py-5 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-300">{label}</p>
      <p className="text-xl font-semibold capitalize mt-1">
        {value}
      </p>
    </div>
    <span className="text-2xl">{emoji}</span>
  </div>
);

const CourseCard = ({ course, actionLabel, onClick }) => (
  <div className="rounded-xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 border border-white/10 backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition">
    <div className="h-32 bg-gradient-to-br from-blue-500/30 to-purple-500/30"></div>
    <div className="p-4">
      <h3 className="font-semibold mb-2">{course.title}</h3>
      <p className="text-sm text-gray-300 mb-4">
        {course.description?.slice(0, 60)}...
      </p>
      <button
        onClick={onClick}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md text-sm"
      >
        {actionLabel}
      </button>
    </div>
  </div>
);

export default Dashboard;
