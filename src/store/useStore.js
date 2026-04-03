import { create } from "zustand";

// ✅ DEFAULT MOCK DATA
const defaultData = [
  {
    id: 1,
    date: "2026-04-01",
    amount: 5000,
    category: "Salary",
    type: "income",
  },
  {
    id: 2,
    date: "2026-04-02",
    amount: 800,
    category: "Food",
    type: "expense",
  },
  {
    id: 3,
    date: "2026-04-03",
    amount: 1200,
    category: "Shopping",
    type: "expense",
  },
  {
    id: 4,
    date: "2026-04-04",
    amount: 2000,
    category: "Freelance",
    type: "income",
  },
];

// ✅ LOAD DATA
const getInitialData = () => {
  try {
    const data = JSON.parse(localStorage.getItem("transactions"));

    if (!data || data.length === 0) {
      localStorage.setItem("transactions", JSON.stringify(defaultData));
      return defaultData;
    }

    return data;
  } catch {
    return defaultData;
  }
};

export const useStore = create((set, get) => ({
  transactions: getInitialData(),

  role: "viewer",

  filters: {
    type: "all",
    category: "all",
    search: "",
  },

  setRole: (role) => set({ role }),

  setFilter: (key, value) =>
    set({
      filters: { ...get().filters, [key]: value },
    }),

  addTransaction: (txn) => {
    const updated = [...get().transactions, txn];
    localStorage.setItem("transactions", JSON.stringify(updated));
    set({ transactions: updated });
  },

  updateTransaction: (txn) => {
    const updated = get().transactions.map((t) =>
      t?.id === txn.id ? txn : t
    );
    localStorage.setItem("transactions", JSON.stringify(updated));
    set({ transactions: updated });
  },
}));