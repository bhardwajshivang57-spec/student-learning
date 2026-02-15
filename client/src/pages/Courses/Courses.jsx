import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { getAllCourses } from "../../services/courseService";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    // ⚠️ getAllCourses expects an object
    getAllCourses({ query, sort, page })
      .then((data) => {
        if (mounted) {
          setCourses(data || []);
        }
      })
      .catch((err) => {
        console.error("Courses fetch error:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [query, sort, page]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/src/assets/dashboard-bg.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-10 text-white">
        {/* Header / Search */}
        <div className="mb-10 rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-6">
          <h1 className="text-2xl font-semibold">Explore Courses</h1>
          <p className="text-gray-300 mt-1">
            Learn from top instructors with structured content
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses..."
              className="flex-1 rounded-lg px-4 py-2 bg-white/10 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg px-3 py-2 bg-white/10 border border-white/10 focus:outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <Loader />
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-300">
            No courses found
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 border border-white/10 backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition"
              >
                <Link to={`/courses/${course._id}`}>
                  <div className="h-40 bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-gray-300">
                    Course Thumbnail
                  </div>
                </Link>

                <div className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                    {course.title}
                  </h3>

                  <p className="text-sm text-gray-300">
                    {course.instructor?.name || "Instructor"} •{" "}
                    {course.duration || "Self paced"}
                  </p>


                  {course.features && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {course.features.slice(0, 3).map((f, i) => (
                        <span
                          key={i}
                          className="text-xs bg-white/10 px-2 py-1 rounded"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="text-lg font-semibold">
                        ₹{course.price ?? "Free"}
                      </p>
                    </div>

                    <Link
                      to={`/courses/${course._id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-4 py-1 rounded border border-white/20 hover:bg-white/10"
          >
            Prev
          </button>

          <span className="px-4 py-1 rounded border border-white/20">
            Page {page}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-1 rounded border border-white/20 hover:bg-white/10"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
