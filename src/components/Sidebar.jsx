import { LayoutDashboard, List, BarChart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const item = (path, icon, label) => (
    <Link
      to={path}
      className={`flex items-center gap-3 p-3 rounded-lg transition ${
        pathname === path
          ? "bg-white/20"
          : "hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-indigo-600 to-purple-700 text-white p-6 flex flex-col">
      
      <h1 className="text-2xl font-bold mb-10">💸 FinTrack</h1>

      <div className="space-y-2">
        {item("/", <LayoutDashboard size={18} />, "Dashboard")}
        {item("/transactions", <List size={18} />, "Transactions")}
        {item("/insights", <BarChart size={18} />, "Insights")}
      </div>

    </div>
  );
};

export default Sidebar;