import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#6366F1", // indigo
  "#22C55E", // green
  "#F59E0B", // yellow
  "#EF4444", // red
  "#3B82F6", // blue
];

const Charts = ({ data }) => {
  // 📊 CATEGORY GROUPING (ONLY EXPENSES)
  const categoryMap = {};

  data.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // ✅ TOTAL FOR PERCENTAGE
  const total = pieData.reduce((sum, item) => sum + item.value, 0);

  // 📈 LINE DATA
  const lineData = data.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">

      {/* 📈 LINE CHART */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">
        <h2 className="mb-2 font-medium">Balance Trend</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip /> {/* ✅ HOVER TOOLTIP */}
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#6366F1"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 PIE CHART */}
      <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow">

        <h2 className="mb-4 font-medium">Spending Breakdown</h2>

        <div className="flex flex-col md:flex-row items-center gap-6">

          {/* PIE */}
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Tooltip /> {/* ✅ HOVER TOOLTIP */}

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* LEGEND */}
          <div className="space-y-2">

            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">

                {/* COLOR DOT */}
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                {/* LABEL + % */}
                <span className="text-sm">
                  {entry.name} — ₹{entry.value} (
                  {total > 0
                    ? ((entry.value / total) * 100).toFixed(1)
                    : 0}
                  %)
                </span>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Charts;