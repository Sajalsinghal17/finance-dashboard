import { useState } from "react";
import { useStore } from "../store/useStore";
import AddTransactionModal from "../components/AddTransactionModal";

const Transactions = () => {
  const { transactions = [], filters, setFilter, role } = useStore();
  const [editData, setEditData] = useState(null);

  // 🔍 FILTER LOGIC
  const filtered = transactions.filter((t) => {
    if (!t) return false;

    const typeMatch =
      filters.type === "all" || t.type === filters.type;

    const categoryMatch =
      filters.category === "all" ||
      t.category === filters.category;

    const searchMatch =
      (t.category || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      (t.type || "")
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    return typeMatch && categoryMatch && searchMatch;
  });

  const categories = [
    "all",
    ...new Set(transactions.map((t) => t?.category).filter(Boolean)),
  ];

  // 📤 EXPORT CSV
  const exportCSV = () => {
    const csv = [
      ["Date", "Amount", "Category", "Type"],
      ...filtered.map((t) => [
        t.date,
        t.amount,
        t.category,
        t.type,
      ]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  // 📤 EXPORT JSON
  const exportJSON = () => {
    const blob = new Blob(
      [JSON.stringify(filtered, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4">

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Transactions
        </h1>

        <div className="flex flex-wrap gap-3">

          {/* TYPE */}
          <select
            onChange={(e) => setFilter("type", e.target.value)}
            className="px-4 py-2 rounded-xl 
            bg-white dark:bg-gray-900 
            text-gray-700 dark:text-gray-200 
            border border-gray-300 dark:border-gray-700 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* CATEGORY */}
          <select
            onChange={(e) => setFilter("category", e.target.value)}
            className="px-4 py-2 rounded-xl 
            bg-white dark:bg-gray-900 
            text-gray-700 dark:text-gray-200 
            border border-gray-300 dark:border-gray-700 
            shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* SEARCH */}
          <input
            placeholder="Search transactions..."
            onChange={(e) => setFilter("search", e.target.value)}
            className="px-4 py-2 rounded-xl w-56
            bg-white dark:bg-gray-900 
            text-gray-700 dark:text-gray-200 
            border border-gray-300 dark:border-gray-700 
            shadow-sm placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* EXPORT CSV */}
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 transition"
          >
            Export CSV
          </button>

          {/* EXPORT JSON */}
          <button
            onClick={exportJSON}
            className="px-4 py-2 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition"
          >
            Export JSON
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl shadow-lg overflow-hidden
        bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800
        border border-gray-200 dark:border-gray-800">

        {filtered.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No transactions found 🚫
          </p>
        ) : (
          <table className="min-w-full text-left">

            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 text-sm">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Type</th>
                {role === "admin" && (
                  <th className="px-6 py-3">Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-t border-gray-200 dark:border-gray-800
                  hover:bg-gray-50 dark:hover:bg-gray-800/60 transition"
                >

                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {t.date}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                    ₹{t.amount}
                  </td>

                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {t.category}
                  </td>

                  <td
                    className={`px-6 py-4 font-medium ${
                      t.type === "income"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {t.type}
                  </td>

                  {role === "admin" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setEditData(t)}
                        className="text-indigo-500 hover:text-indigo-400 transition font-medium"
                      >
                        Edit
                      </button>
                    </td>
                  )}

                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>

      {editData && (
        <AddTransactionModal
          editData={editData}
          close={() => setEditData(null)}
        />
      )}

    </div>
  );
};

export default Transactions;