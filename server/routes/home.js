const path = require("path");

const home = require("express").Router();

const chalkMessage = require("../console");

home.get("/", async (req, res) => {
  chalkMessage("info", "get", "home route");
  res.sendFile("home.html", {
    root: path.join(__dirname, "../public/"),
  });
});

module.exports = home;
