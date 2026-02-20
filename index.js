import colors from "colors";
import chalk from "chalk";

import { sayGoodbye, sayHello } from "./greetings.js";

console.log(colors.green("This text is green!"));

const name = "Samuel";
console.log(colors.yellow(sayHello(name)));
console.log(colors.red(sayGoodbye(name)));
console.log(chalk.blue("This text is blue!"));
console.log(chalk.red("This text is red!"));
