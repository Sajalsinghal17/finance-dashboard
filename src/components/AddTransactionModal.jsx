import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";

const AddTransactionModal = ({ close, editData }) => {
  const { addTransaction, updateTransaction } = useStore();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    }
  }, [editData]);

  const handleSubmit = () => {
    if (!form.amount || !form.category) return;

    if (editData) {
      updateTransaction(form);
    } else {
      addTransaction({
        id: Date.now(),
        date: new Date().toISOString().slice(0, 10),
        ...form,
        amount: Number(form.amount),
      });
    }

    close();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl w-96 shadow-lg relative">

        <button onClick={close} className="absolute top-3 right-3">
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {editData ? "Edit Transaction" : "Add Transaction"}
        </h2>

        <div className="space-y-3">

          <input
            value={form.amount}
            placeholder="Amount"
            className="w-full p-2 border rounded"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            value={form.category}
            placeholder="Category"
            className="w-full p-2 border rounded"
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <select
            value={form.type}
            className="w-full p-2 border rounded"
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-2 rounded"
          >
            {editData ? "Update" : "Add"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;