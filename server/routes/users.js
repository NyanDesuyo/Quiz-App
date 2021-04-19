const user = require("express").Router();
const db = require("../database/index");
const { nanoid } = require("nanoid");

const chalkMessage = require("../console");

user.get("/", async (req, res) => {
  chalkMessage("info", "get", `/user`);
  const _query = await db.get("user").filter({}).value();
  res.send({ results: _query });
});

user.get("/user", async (req, res) => {
  chalkMessage("info", "get", `/user/?${req.query.param}=${req.query.value}`);
  let _query = "";
  switch (req.query.param) {
    case "id":
      _query = await db.get("user").filter({ id: req.query.value }).value();
      res.send({ result: _query });
      break;

    case "username":
      _query = await db
        .get("user")
        .filter({ username: req.query.value })
        .value();
      res.send({ result: _query });
      break;

    default:
      res.send({ message: "Wrong or No Parameter" });
      break;
  }
});

user.get("/login", async (req, res) => {
  chalkMessage(
    "info",
    "get",
    `/question/login?username=${req.query.username}&password=${req.query.password}`,
  );
  const _query = await db
    .get("user")
    .filter({ username: req.query.username, password: req.query.password })
    .value();
  res.send({
    result: _query,
  });
});

user.post("/", async (req, res) => {
  chalkMessage("info", "post", `/question`);
  await db
    .get("user")
    .push({
      id: nanoid(),
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      status: null,
      isAdmin: false,
    })
    .write();
  res.send({ result: "Saved!" });
});

user.patch("/:id", async (req, res) => {
  chalkMessage("info", "patch", `/question/${req.params.id}`);
  const _update = await db
    .get("user")
    .find({ id: req.params.id })
    .assign({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      status: req.body.status,
    })
    .write();
  res.send({ result: "Updated" });
});

user.delete("/:id", async (req, res) => {
  chalkMessage("info", "delete", `/question/${req.params.id}`);
  await db.get("user").remove({ id: req.params.id }).write();
  res.send({ result: "Deleted" });
});

module.exports = user;
