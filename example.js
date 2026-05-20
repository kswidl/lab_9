import { log } from "./logger.js";

const sum = log({ level: "INFO" })(function sum(a, b) {
    return a + b;
});

sum(5, 3);