import { log, jsonFormatter } from "./logger.js";

const add = log({
    level: "INFO",
    target: "console"
})(function add(a, b) {
    return a + b;
});

const asyncData = log({
    level: "INFO",
    target: "file",
    formatter: jsonFormatter
})(async function asyncData() {
    return "JSON log example";
});

const errorFunction = log({
    level: "ERROR",
    target: "console"
})(function errorFunction() {
    throw new Error("Test error");
});

console.log(add(4, 6));

asyncData();

try {
    errorFunction();
} catch (e) {}