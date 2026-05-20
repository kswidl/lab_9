import { log } from "./logger.js";

const sum = log({ level: "INFO" })(function sum(a, b) {
    return a + b;
});

const fetchData = log({ level: "INFO" })(async function fetchData() {
    return "Data loaded";
});

console.log(sum(2, 4));

fetchData().then(console.log);