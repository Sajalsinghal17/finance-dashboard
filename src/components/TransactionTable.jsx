import { useStore } from "../store/useStore";

const TransactionTable = () => {
  const { transactions, filter, search } = useStore();

  const filtered = transactions.filter((txn) => {
    return (
      (filter === "all" || txn.type === filter) &&
      txn.category.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold mb-2">Transactions</h2>

      <table className="w-full">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((txn) => (
            <tr key={txn.id} className="border-t">
              <td>{txn.date}</td>
              <td>₹{txn.amount}</td>
              <td>{txn.category}</td>
              <td>{txn.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;