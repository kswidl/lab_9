import { log } from "./logger.js";

const divide = log({ level: "INFO" })(function divide(a, b) {
    return a / b;
});

const crash = log({ level: "ERROR" })(function crash() {
    throw new Error("Something went wrong");
});

console.log(divide(10, 2));

try {
    crash();
} catch (e) {}