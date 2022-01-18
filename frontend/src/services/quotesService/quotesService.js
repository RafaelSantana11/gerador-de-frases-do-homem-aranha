export const getQuote = () =>
  fetch("http://localhost:5000").then((response) => response.json());
