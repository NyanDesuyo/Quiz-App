const chalk = require("chalk");

function chalkMessage(type, method, message) {
  switch (type) {
    case "info":
      console.log(
        chalk.whiteBright(
          method.toString().toUpperCase() + "\t" + chalk.blueBright(message),
        ),
      );
      break;
    case "warning":
      console.log(
        chalk.whiteBright(
          method.toString().toUpperCase() + "\t" + chalk.yellowBright(message),
        ),
      );
      break;
    case "error":
      console.log(
        chalk.whiteBright(
          method.toString().toUpperCase() + "\t" + chalk.redBright(message),
        ),
      );
      break;
    default:
      break;
  }
}

module.exports = chalkMessage;
