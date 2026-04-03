import { Moon, Sun } from "lucide-react";
import { useStore } from "../store/useStore";

const Header = ({ dark, setDark }) => {
  const { role, setRole } = useStore();

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow flex justify-between items-center">

      <h1 className="text-lg font-semibold tracking-tight">
        Dashboard
      </h1>

      <div className="flex items-center gap-4">

        {/* ROLE SWITCH */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">

          <button
            onClick={() => setRole("viewer")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              role === "viewer"
                ? "bg-white dark:bg-gray-900 shadow"
                : "text-gray-500"
            }`}
          >
            Viewer
          </button>

          <button
            onClick={() => setRole("admin")}
            className={`px-4 py-1.5 rounded-lg text-sm ${
              role === "admin"
                ? "bg-white dark:bg-gray-900 shadow"
                : "text-gray-500"
            }`}
          >
            Admin
          </button>

        </div>

        {/* DARK MODE */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-xl bg-indigo-600 text-white"
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

      </div>

    </div>
  );
};

export default Header;