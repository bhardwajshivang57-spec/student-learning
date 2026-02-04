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

    getAllCourses(query, sort, page)
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
    <div className="min-h-screen bg-gray-50">
      {/* HERO / SEARCH BAR */}
      <div className="w-full bg-gray-900">
        <div className="px-6 md:px-24 py-16">
          <div className="max-w-3xl bg-white rounded-2xl p-6 shadow-lg">
            <h1 className="text-2xl font-bold">Explore Courses</h1>
            <p className="text-gray-600 mt-1">
              Learn from top instructors with live & recorded classes
            </p>

            <div className="mt-4 flex gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses..."
                className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="popular">Most Popular</option>
                <option value="new">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {courses.length === 0 ? (
              <p className="text-center text-gray-500">No courses found</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                  >
                    <Link to={`/courses/${course._id}`}>
                      <img
                        src={course.thumbnail || "/default-course.jpg"}
                        alt={course.title}
                        className="w-full h-40 object-cover"
                      />
                    </Link>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {course.instructor || "Instructor"} •{" "}
                        {course.duration || "Self paced"}
                      </p>

                      {course.features && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {course.features.slice(0, 3).map((f, i) => (
                            <span
                              key={i}
                              className="text-xs bg-gray-100 px-2 py-1 rounded"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Price</p>
                          <p className="text-lg font-bold">
                            ₹{course.price ?? "Free"}
                          </p>
                        </div>

                        <Link
                          to={`/courses/${course._id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAGINATION */}
            <div className="mt-10 flex justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-4 py-1 border rounded"
              >
                Prev
              </button>

              <span className="px-4 py-1 border rounded bg-white">
                Page {page}
              </span>

              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-1 border rounded"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
