import fs from "fs";

function getTimestamp() {
    return new Date().toISOString();
}

function writeToFile(message) {
    fs.appendFileSync("./logs/app.log", message + "\n");
}

function formatMessage(level, message) {
    return `[${getTimestamp()}] [${level}] ${message}`;
}

function output(target, message) {
    if (target === "console") {
        console.log(message);
    }

    if (target === "file") {
        writeToFile(message);
    }
}

function isAsyncFunction(fn) {
    return fn.constructor.name === "AsyncFunction";
}

export function log({
    level = "INFO",
    target = "console"
} = {}) {

    return function (fn) {

        if (isAsyncFunction(fn)) {
            return async function (...args) {
                const start = Date.now();

                try {
                    if (level !== "ERROR") {
                        output(
                            target,
                            formatMessage(level, `${fn.name} called`)
                        );

                        output(
                            target,
                            formatMessage(level, `Arguments: ${JSON.stringify(args)}`)
                        );
                    }

                    const result = await fn(...args);

                    const executionTime = Date.now() - start;

                    if (level !== "ERROR") {
                        output(
                            target,
                            formatMessage(
                                level,
                                `Result: ${JSON.stringify(result)}`
                            )
                        );

                        output(
                            target,
                            formatMessage(
                                level,
                                `Execution time: ${executionTime}ms`
                            )
                        );
                    }

                    return result;

                } catch (error) {
                    output(
                        target,
                        formatMessage(
                            "ERROR",
                            `${fn.name}: ${error.message}`
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
                    output(
                        target,
                        formatMessage(level, `${fn.name} called`)
                    );

                    output(
                        target,
                        formatMessage(level, `Arguments: ${JSON.stringify(args)}`)
                    );
                }

                const result = fn(...args);

                const executionTime = Date.now() - start;

                if (level !== "ERROR") {
                    output(
                        target,
                        formatMessage(
                            level,
                            `Result: ${JSON.stringify(result)}`
                        )
                    );

                    output(
                        target,
                        formatMessage(
                            level,
                            `Execution time: ${executionTime}ms`
                        )
                    );
                }

                return result;

            } catch (error) {
                output(
                    target,
                    formatMessage(
                        "ERROR",
                        `${fn.name}: ${error.message}`
                    )
                );

                throw error;
            }
        };
    };
}