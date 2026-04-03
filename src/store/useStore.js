import { create } from "zustand";

const getInitialData = () => {
  try {
    const data = JSON.parse(localStorage.getItem("transactions"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
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