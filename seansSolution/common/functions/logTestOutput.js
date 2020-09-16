const chalk = require("chalk");

module.exports = (text, result) => {
  console.log(
    `${
      result
        ? chalk.black.bgGreen.bold("TRUE")
        : chalk.black.bgRed.bold("FALSE")
    }\t${text.toUpperCase()}`
  );
};
