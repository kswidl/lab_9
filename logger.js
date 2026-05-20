import fs from "fs";

function getTimestamp() {
    return new Date().toISOString();
}

function writeToFile(message) {
    fs.appendFileSync("./logs/app.log", message + "\n");
}

function defaultFormatter(data) {
    return `[${data.timestamp}] [${data.level}] ${data.message}`;
}

function jsonFormatter(data) {
    return JSON.stringify(data);
}

function send(target, message) {

    if (target === "console") {
        console.log(message);
    }

    if (target === "file") {
        writeToFile(message);
    }

    if (target === "external") {
        console.log("External service:", message);
    }
}

function isAsyncFunction(fn) {
    return fn.constructor.name === "AsyncFunction";
}

export function log({
    level = "INFO",
    target = "console",
    formatter = defaultFormatter
} = {}) {

    return function (fn) {

        const buildLog = (message, currentLevel) => {
            return formatter({
                timestamp: getTimestamp(),
                level: currentLevel,
                message
            });
        };

        if (isAsyncFunction(fn)) {
            return async function (...args) {
                const start = Date.now();

                try {
                    if (level !== "ERROR") {
                        send(
                            target,
                            buildLog(
                                `${fn.name} called with ${JSON.stringify(args)}`,
                                level
                            )
                        );
                    }

                    const result = await fn(...args);

                    const executionTime = Date.now() - start;

                    if (level !== "ERROR") {

                        send(
                            target,
                            buildLog(
                                `Result: ${JSON.stringify(result)}`,
                                level
                            )
                        );

                        send(
                            target,
                            buildLog(
                                `Execution time: ${executionTime}ms`,
                                level
                            )
                        );
                    }

                    return result;

                } catch (error) {
                     send(
                        target,
                        buildLog(
                            error.message,
                            "ERROR"
                        )
                    );

                    throw error;
                }
            };
        }

        return function (...args) {
            const start = Date.now();

            try {
                if (level !== "ERROR") {

                    send(
                        target,
                        buildLog(
                            `${fn.name} called with ${JSON.stringify(args)}`,
                            level
                        )
                    );
                }

                const result = fn(...args);

                const executionTime = Date.now() - start;

                if (level !== "ERROR") {

                    send(
                        target,
                        buildLog(
                            `Result: ${JSON.stringify(result)}`,
                            level
                        )
                    );

                    send(
                        target,
                        buildLog(
                            `Execution time: ${executionTime}ms`,
                            level
                        )
                    );
                }

                return result;

            } catch (error) {
                 send(
                    target,
                    buildLog(
                        error.message,
                        "ERROR"
                    )
                );
                
                throw error;
            }
        };
    };
}

export { jsonFormatter };