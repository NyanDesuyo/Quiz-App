const question = require("express").Router();
const db = require("../database/index");
const { nanoid } = require("nanoid");

const chalkMessage = require("../console");

question.get("/", async (req, res) => {
  chalkMessage("info", "get", "/question");
  const _query = await db.get("question").filter({}).value();
  res.send({ results: _query });
});

question.get("/:id", async (req, res) => {
  chalkMessage("info", "get", `/question/${req.params.id}`);
  const _query = await db.get("question").filter({ id: req.params.id }).value();
  res.send({ result: _query });
});

question.get("/number/:number", async (req, res) => {
  chalkMessage("info", "get", `/question/number/${req.params.number}`);
  const _query = await db
    .get("question")
    .filter({ number: parseInt(req.params.number) })
    .value();
  res.send(_query[0]);
});

question.post("/", async (req, res) => {
  chalkMessage("info", "post", `/question`);
  const _save = await db
    .get("question")
    .push({
      id: nanoid(),
      number: req.body.number,
      question: req.body.question,
      answer: req.body.answer,
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
    })
    .write();
  res.send({ result: "Saved!" });
});

question.patch("/:id", async (req, res) => {
  chalkMessage("info", "patch", `/question/${req.params.id}`);
  const _update = await db
    .get("question")
    .find({ id: req.params.id })
    .assign({
      number: req.body.number,
      question: req.body.question,
      answer: req.body.answer,
      a: req.body.a,
      b: req.body.b,
      c: req.body.c,
    })
    .write();
  res.send({ result: "Updated" });
});

question.delete("/:id", async (req, res) => {
  chalkMessage("info", "delete", `/question/${req.params.id}`);
  const _delete = await db
    .get("question")
    .remove({ id: req.params.id })
    .write();
  res.send({ result: "Deleted" });
});

module.exports = question;
