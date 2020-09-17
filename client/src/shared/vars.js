module.exports = {
  apiUrl:
    process.env.NODE_ENV === "production"
      ? "https://saif-scrap-helper.herokuapp.com"
      : "http://localhost:4001"
};
