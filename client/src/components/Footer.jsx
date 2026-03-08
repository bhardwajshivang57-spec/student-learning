import { Link } from "react-router-dom";

export default function Footer() {
return ( <footer className="bg-[#0f172a] text-gray-300 border-t border-white/10 py-6"> <div className="max-w-7xl mx-auto px-6 text-center">

    {/* Website Info */}
    <h2 className="text-lg font-semibold text-white mb-2">
      SkillSpark Academy
    </h2>

    <p className="text-sm text-gray-400 max-w-xl mx-auto">
      SkillSpark Academy is an online learning platform where students can
      explore courses, gain practical knowledge, and build skills for their future careers.
    </p>

    {/* Creator Info */}
    <p className="text-sm text-gray-400 mt-4">
      Built by <span className="text-white font-medium">Shivang Bhardwaj</span> •
      Email: <span className="text-blue-400">bhardwajshivang57@gmail.com</span>
    </p>

    {/* Copyright */}
    <p className="text-xs text-gray-500 mt-3">
      © {new Date().getFullYear()} SkillSpark Academy. All rights reserved.
    </p>

  </div>
</footer>

);
}

