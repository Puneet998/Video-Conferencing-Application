import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  // 🔥 Mobile & Tablet par auto popup
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        setShowPopup(true);
      }, 500);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black text-white">

      {/* 🔵 Circle Rain Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="circle-rain"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* 💻 Desktop Navbar */}
      <nav className="hidden lg:flex justify-between items-center px-10 py-6 relative z-10">
        <h2 className="text-2xl font-semibold">Apna Video Call</h2>

        <div className="flex gap-6 items-center">
          <button onClick={() => navigate("/aljk23")}>
            Join as Guest
          </button>

          <button onClick={() => navigate("/auth")}>
            Register
          </button>

          <button
            onClick={() => navigate("/auth")}
            className="bg-indigo-600 px-4 py-2 rounded-lg"
          >
            Login
          </button>
        </div>
      </nav>

      {/* 🌟 Center Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen text-center px-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
            Video Conferencing Application
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Made by <span className="text-indigo-400 font-semibold">Puneet</span>
          </p>

          {/* Get Started Button */}
          <button
            onClick={() => navigate("/home")}
            className="mt-6 px-10 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 transition text-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* 📱 Bottom Popup (Mobile + Tablet) */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full sm:w-[420px] bg-slate-950 rounded-t-3xl p-6 animate-slideUpStrong">

            {/* ❌ Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-white text-2xl opacity-80 hover:opacity-100"
            >
              ✕
            </button>

            <h2 className="text-center text-xl font-semibold mb-6">
              Continue With
            </h2>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => navigate("/1111-2222-3333")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg"
              >
                Join as Guest
              </button>

              <button
                onClick={() => navigate("/auth")}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-lg"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/auth")}
                className="w-full py-3 rounded-xl border border-indigo-500 text-lg"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
