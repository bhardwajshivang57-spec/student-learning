import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import * as courseService from "../../services/courseService";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const isTeacher =
    user?.role === "teacher" || user?.role === "instructor";

  useEffect(() => {
    const loadCourses = async () => {
      try {
        if (!user) return;

        let data = [];

        if (user.role === "student") {
          data = await courseService.getEnrolledCourses(user.token);
        } else {
          data = await courseService.getMyCourses(user.token);
        }

        setCourses(data || []);
      } catch (error) {
        console.error("DASHBOARD ERROR:", error);
      }
    };

    loadCourses();
  }, [user]);

  const handlePublish = async (courseId) => {
    try {
      await courseService.publishCourse(courseId, user.token);
      alert("Course published successfully 🚀");

      // reload courses after publish
      const updated = await courseService.getMyCourses(user.token);
      setCourses(updated);
    } catch (err) {
      console.error(err);
      alert("Publish failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

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
            label={
              isTeacher
                ? "Total Courses Created"
                : "Courses Enrolled"
            }
            value={courses.length}
            emoji="📘"
          />
          <StatCard
            label="Status"
            value={
              isTeacher
                ? "Instructor Mode"
                : "Learning Active"
            }
            emoji="⚡"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-6">
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
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <div
                        key={course._id}
                        className="rounded-xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 border border-white/10 backdrop-blur-xl p-4"
                      >
                        <h3 className="font-semibold mb-2">
                          {course.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-3">
                          {course.description?.slice(0, 60)}...
                        </p>

                        <button
                          onClick={() =>
                            navigate(`/courses/${course._id}`)
                          }
                          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md text-sm mb-2"
                        >
                          Manage Course
                        </button>

                        {!course.isPublished && (
                          <button
                            onClick={() =>
                              handlePublish(course._id)
                            }
                            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-md text-sm"
                          >
                            Publish Course
                          </button>
                        )}

                        {course.isPublished && (
                          <div className="text-green-400 text-sm text-center mt-2">
                            ✅ Published
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-6">
                  Your Learning Courses
                </h2>

                {courses.length === 0 ? (
                  <div className="text-center py-20">
                    <p className="text-gray-300">
                      You haven’t enrolled in any course yet
                    </p>
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
            <h3 className="text-xl font-semibold mb-6">
              💡 {isTeacher ? "Instructor Tips" : "Quick Tips"}
            </h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              {isTeacher ? (
                <>
                  <li>• Create structured lessons</li>
                  <li>• Keep descriptions clear</li>
                  <li>• Update content regularly</li>
                  <li>• Engage with students</li>
                </>
              ) : (
                <>
                  <li>• Review regularly</li>
                  <li>• Participate actively</li>
                  <li>• Practice daily</li>
                  <li>• Stay consistent</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  <div className="rounded-xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 border border-white/10 backdrop-blur-xl p-4">
    <h3 className="font-semibold mb-2">{course.title}</h3>
    <p className="text-sm text-gray-400 mb-4">
      {course.description?.slice(0, 60)}...
    </p>
    <button
      onClick={onClick}
      className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md text-sm"
    >
      {actionLabel}
    </button>
  </div>
);

export default Dashboard;
