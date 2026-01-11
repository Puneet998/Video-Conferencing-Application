import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/50 z-40 md:hidden ${
          open ? "block" : "hidden"
        }`}
      />

      <aside
        className={`fixed md:static z-50 h-full w-64 bg-slate-900 text-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="p-6 text-2xl font-bold border-b border-slate-700">
          Apna Meet
        </div>

        <nav className="p-4 space-y-4">
          <button onClick={() => navigate("/")} className="sidebar-btn">
            Home
          </button>
          <button onClick={() => navigate("/history")} className="sidebar-btn">
            History
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            className="sidebar-btn text-red-400"
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
