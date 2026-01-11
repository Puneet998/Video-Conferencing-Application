


import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import withAuth from "../utils/withAuth";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function HomeComponent() {
  const navigate = useNavigate();
  const { addToUserHistory } = useContext(AuthContext);

  const [meetingCode, setMeetingCode] = useState("");
  const [error, setError] = useState("");

  // 🔹 FORMAT: 1234-5678-9876
  const formatMeetingCode = (value) => {
    let digits = value.replace(/\D/g, "");
    digits = digits.slice(0, 12);

    if (digits.length <= 4) return digits;
    if (digits.length <= 8)
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;

    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  };

  // const handleJoinVideoCall = async () => {
  //   const pureDigits = meetingCode.replace(/\D/g, "");

  //   if (!pureDigits) {
  //     setError("Meeting code is required");
  //     return;
  //   }

  //   if (pureDigits.length !== 12) {
  //     setError("Meeting code must be exactly 12 digits");
  //     return;
  //   }

  //   setError("");
  //   await addToUserHistory(meetingCode);
  //   navigate(`/${meetingCode}`);
  // };

   const handleJoinVideoCall = async () => {
  const pureDigits = meetingCode.replace(/\D/g, "");

  if (pureDigits.length !== 12) {
    setError("Meeting code must be exactly 12 digits");
    return;
  }

  setError("");
  await addToUserHistory(meetingCode);

  navigate(`/${meetingCode}`, {
    state: { fromHome: true }
  });
};


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white overflow-hidden">

      {/* 🔵 BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
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

      {/* ================= NAVBAR ================= */}
      <nav className="relative z-10 flex justify-between items-center px-6 md:px-10 py-4 border-b border-white/10">
        <h2 className="text-xl md:text-2xl font-semibold">
          Apna Video Call
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/history")}
            className="text-gray-300 hover:text-white transition"
          >
            History
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logged out successfully!");
              navigate("/auth");
            }}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-6 md:px-10 py-16 gap-12">

        {/* LEFT CARD */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 animate-slideUp">

            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              Join a Meeting
            </h1>

            <p className="text-gray-400 mb-6">
              Enter your meeting code to start or join a video call.
            </p>

            <input
              type="text"
              inputMode="numeric"
              placeholder="1234-5678-9876"
              value={meetingCode}
              onChange={(e) =>
                setMeetingCode(formatMeetingCode(e.target.value))
              }
              maxLength={14} // 12 digits + 2 hyphen
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-indigo-500 mb-2"
            />

            {error && (
              <p className="text-red-400 text-sm mb-3">{error}</p>
            )}

            <button
              onClick={handleJoinVideoCall}
              className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-lg font-semibold hover:opacity-90 transition"
            >
              Join Meeting
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex w-1/2 justify-center animate-imageReveal">
          <img
            src="/logo3.png"
            alt="Video Call"
            className="w-[420px] rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
