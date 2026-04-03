import { useStore } from "../store/useStore";

const Insights = () => {
  const { transactions } = useStore();

  // 💰 TOTALS
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  // 📊 CATEGORY ANALYSIS
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const topCategory =
    Object.keys(categoryMap).length > 0
      ? Object.keys(categoryMap).reduce((a, b) =>
          categoryMap[a] > categoryMap[b] ? a : b
        )
      : "N/A";

  // 📅 MONTHLY COMPARISON
  const monthlyMap = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // YYYY-MM
    monthlyMap[month] = (monthlyMap[month] || 0) + t.amount;
  });

  const monthlyData = Object.entries(monthlyMap);

  // 🧠 EXTRA INSIGHT
  const savings = income - expense;

  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Insights</h1>

      {/* SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Income</p>
          <h2 className="text-xl font-semibold text-green-500">
            ₹{income}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Expense</p>
          <h2 className="text-xl font-semibold text-red-500">
            ₹{expense}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Savings</p>
          <h2
            className={`text-xl font-semibold ${
              savings >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ₹{savings}
          </h2>
        </div>

      </div>

      {/* TOP CATEGORY */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
        <p className="text-gray-500 text-sm">
          Highest Spending Category
        </p>
        <h2 className="text-lg font-semibold">
          {topCategory}
        </h2>
      </div>

      {/* MONTHLY COMPARISON */}
      <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow">
        <h2 className="font-semibold mb-3">
          Monthly Comparison
        </h2>

        {monthlyData.length === 0 ? (
          <p className="text-gray-500">
            No data available
          </p>
        ) : (
          <div className="space-y-2">
            {monthlyData.map(([month, value]) => (
              <div
                key={month}
                className="flex justify-between border-b pb-1"
              >
                <span>{month}</span>
                <span className="font-medium">₹{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EXTRA INSIGHT */}
      <div className="bg-indigo-100 dark:bg-indigo-900/40 p-5 rounded-2xl">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          💡 Insight:
        </p>

        <p className="mt-1 font-medium">
          {savings > 0
            ? "You are saving money this month 👍"
            : "Your expenses are higher than income ⚠️"}
        </p>
      </div>

    </div>
  );
};

export default Insights;