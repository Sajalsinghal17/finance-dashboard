export const fetchTransactions = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(localStorage.getItem("transactions")) || []);
    }, 500);
  });