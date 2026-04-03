import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Header from "./components/Header";

import {
  LayoutDashboard,
  List,
  BarChart,
  Menu,
  X,
} from "lucide-react";

const App = () => {
  const [page, setPage] = useState("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const NavItem = ({ label, icon, active, onClick }) => (
    <button
      onClick={() => {
        onClick();
        setMenuOpen(false); // close on mobile click
      }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${
        active ? "bg-white/20" : "hover:bg-white/10"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-6">

        <div className="flex items-center gap-2 mb-10">
          <span className="text-2xl">💸</span>
          <h1 className="text-xl font-bold">FinTrack</h1>
        </div>

        <nav className="space-y-2">
          <NavItem
            label="Dashboard"
            icon={<LayoutDashboard size={18} />}
            active={page === "dashboard"}
            onClick={() => setPage("dashboard")}
          />
          <NavItem
            label="Transactions"
            icon={<List size={18} />}
            active={page === "transactions"}
            onClick={() => setPage("transactions")}
          />
          <NavItem
            label="Insights"
            icon={<BarChart size={18} />}
            active={page === "insights"}
            onClick={() => setPage("insights")}
          />
        </nav>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-indigo-600 text-white shadow-lg"
      >
        <Menu size={20} />
      </button>

      {/* MOBILE SIDEBAR */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 flex">

          {/* OVERLAY */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          {/* DRAWER */}
          <div className="relative w-64 bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-6 z-50">

            <div className="flex justify-between items-center mb-10">
              <h1 className="text-xl font-bold">FinTrack</h1>
              <button onClick={() => setMenuOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="space-y-2">
              <NavItem
                label="Dashboard"
                icon={<LayoutDashboard size={18} />}
                active={page === "dashboard"}
                onClick={() => setPage("dashboard")}
              />
              <NavItem
                label="Transactions"
                icon={<List size={18} />}
                active={page === "transactions"}
                onClick={() => setPage("transactions")}
              />
              <NavItem
                label="Insights"
                icon={<BarChart size={18} />}
                active={page === "insights"}
                onClick={() => setPage("insights")}
              />
            </nav>

          </div>
        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 p-4 md:p-8 space-y-6">

        <Header dark={dark} setDark={setDark} />

        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}

      </div>

    </div>
  );
};

export default App;