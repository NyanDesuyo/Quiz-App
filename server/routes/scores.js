const score = require("express").Router();
const db = require("../database/index");
const { nanoid } = require("nanoid");

const chalkMessage = require("../console");

score.get("/", async (req, res) => {
  chalkMessage("info", "get", "/score");
  const _query = await db.get("score").filter({}).value();
  res.send({ results: _query });
});

score.get("/:id", async (req, res) => {
  chalkMessage("info", "get", `/score/${req.params.id}`);
  const _query = await db.get("score").filter({ id: req.params.id }).value();
  res.send({ result: _query });
});

score.post("/", async (req, res) => {
  chalkMessage("info", "post", `/score`);
  const curretRecord = new Date();
  const options = { dateStyle: "full", timeStyle: "long" };

  const date = new Intl.DateTimeFormat(["id"], options).format(curretRecord);

  const _save = await db
    .get("score")
    .push({
      id: nanoid(),
      name: req.body.name,
      score: req.body.score,
      date: `${date}`,
    })
    .write();
  res.send({ result: "Saved!" });
});

score.patch("/:id", async (req, res) => {
  chalkMessage("info", "patch", `/score/${req.params.id}`);
  const _update = await db
    .get("score")
    .find({ id: req.params.id })
    .assign({
      name: req.body.name,
      score: req.body.score,
    })
    .write();
  res.send({ result: "Updated" });
});

score.delete("/:id", async (req, res) => {
  chalkMessage("info", "delete", `/score/${req.params.id}`);
  const _delete = await db.get("score").remove({ id: req.params.id }).write();
  res.send({ result: "Deleted" });
});

module.exports = score;
