"use strict";

const networkInterfaces = require("os").networkInterfaces();

const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const port = 3000;
const hexColor = "#89ddff";

const homeRoute = require("./routes/home");
const questionRoute = require("./routes/questions");
const scoreRoute = require("./routes/scores");
const userRoute = require("./routes/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/", homeRoute);
app.use("/question", questionRoute);
app.use("/score", scoreRoute);
app.use("/user", userRoute);

// TODO, simplify this
let address,
  ifaces = networkInterfaces;
for (let dev in ifaces) {
  ifaces[dev].filter((details) =>
    details.family === "IPv4" && details.internal === false
      ? (address = details.address)
      : undefined,
  );
}

app.listen(port, () => {
  console.clear();
  try {
    console.log(
      chalk.bgGreen.black(" Done ") + chalk.green(" Run successfuly"),
    );
    console.log("\n");
    console.log(`  Server running at :`);
    console.log(
      `  - Local:   ${chalk.hex(hexColor)(`http://localhost:${port}/`)}`,
    );
    console.log(
      `  - Remote:  ${chalk.hex(hexColor)(`http://${address}:${port}/`)}`,
    );
    console.log(`\n` + `  Interaction Print Bellow` + `\n`);
  } catch (error) {
    console.log(
      chalk.bgRed.black(" Error ") + chalk.red(" Something went Wrong"),
    );
    console.log(error);
  }
});
