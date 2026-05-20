export function log({ level = "INFO" } = {}) {
    return function (fn) {
        return function (...args) {
            console.log(`[${level}] Calling ${fn.name}`);
            console.log("Arguments:", args);

            const result = fn(...args);

            console.log("Result:", result);

            return result;
        };
    };
}