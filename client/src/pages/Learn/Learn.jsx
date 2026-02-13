import { useState } from "react";
import { useParams } from "react-router-dom";

const lessonsData = [
  { id: 1, title: "Introduction", content: "Welcome to this course. In this lesson, you will understand what this course is about." },
  { id: 2, title: "Basics", content: "This lesson covers the basic concepts you need before moving forward." },
  { id: 3, title: "Advanced Concepts", content: "Here we dive into more advanced topics with practical examples." },
];

export default function Learn() {
  const { courseId } = useParams();
  const [currentLesson, setCurrentLesson] = useState(lessonsData[0]);

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
      <div className="relative max-w-7xl mx-auto px-8 py-10 text-white">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Course Learning</h1>
          <p className="text-gray-300 mt-2">
            Course ID: <span className="font-medium">{courseId}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1 rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-5">
            <h2 className="text-lg font-semibold mb-4">Lessons</h2>

            <ul className="space-y-2">
              {lessonsData.map((lesson) => (
                <li
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`cursor-pointer px-3 py-2 rounded-lg text-sm transition
                    ${
                      currentLesson.id === lesson.id
                        ? "bg-blue-600/80"
                        : "hover:bg-white/10"
                    }
                  `}
                >
                  {lesson.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-3 rounded-2xl bg-gradient-to-br from-[#1b1f3b]/80 to-[#0f1224]/80 backdrop-blur-xl border border-white/10 p-8">
            <h2 className="text-2xl font-semibold mb-4">
              {currentLesson.title}
            </h2>

            <p className="text-gray-300 leading-relaxed mb-10">
              {currentLesson.content}
            </p>

            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">
                Mark as Complete
              </button>

              <button className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
                Next Lesson →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
