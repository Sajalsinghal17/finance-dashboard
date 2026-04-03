import { useStore } from "../store/useStore";
import SummaryCard from "../components/SummaryCard";
import Charts from "../components/Charts";
import AddTransactionModal from "../components/AddTransactionModal";
import { useState } from "react";

const Dashboard = () => {
  const { transactions, role } = useStore();
  const [open, setOpen] = useState(false);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-8">

      {/* ADD BUTTON */}
      {role === "admin" && (
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-xl hover:scale-105 transition"
        >
          + Add Transaction
        </button>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <SummaryCard title="Balance" value={income - expense} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expenses" value={expense} />
      </div>

      {/* CHARTS */}
      <Charts data={transactions} />

      {open && <AddTransactionModal close={() => setOpen(false)} />}
    </div>
  );
};

export default Dashboard;