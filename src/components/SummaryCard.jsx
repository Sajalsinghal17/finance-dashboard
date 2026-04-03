import { TrendingUp, TrendingDown } from "lucide-react";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-xl transition group">

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{title}</p>

        {title === "Income" ? (
          <TrendingUp className="text-green-500 group-hover:scale-110 transition" />
        ) : title === "Expenses" ? (
          <TrendingDown className="text-red-500 group-hover:scale-110 transition" />
        ) : null}
      </div>

      <h2 className="text-3xl font-bold mt-2">₹{value}</h2>
    </div>
  );
};

export default SummaryCard;