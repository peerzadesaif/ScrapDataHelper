const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  app.use(`/api/`, require(`./AdminRoutes`));
};
