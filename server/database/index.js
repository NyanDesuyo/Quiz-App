const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapters = new FileSync("./database.json");

// Its Weird, maybe there other way to solve this
module.exports = database = low(adapters);

database.defaults({ score: [], user: [], question: [] }).write();
