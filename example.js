import { log } from "./logger.js";

const multiply = log({
    level: "INFO",
    target: "console"
})(function multiply(a, b) {
    return a * b;
});

const asyncTask = log({
    level: "INFO",
    target: "file"
})(async function asyncTask() {

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Async completed");
        }, 1000);
    });
});

console.log(multiply(3, 5));

asyncTask();