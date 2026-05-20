function getTimestamp() {
    return new Date().toISOString();
}

export function log({ level = "INFO" } = {}) {
    return function (fn) {
        return function (...args) {
           const timestamp = getTimestamp();

            try {
                if (level !== "ERROR") {
                    console.log(`[${timestamp}] [${level}] Calling ${fn.name}`);
                    console.log("Arguments:", args);
                }

                const result = fn(...args);

                if (level !== "ERROR") {
                    console.log(`[${timestamp}] [${level}] Result:`, result);
                }

                return result;
            } catch (error) {
                console.error(
                    `[${timestamp}] [ERROR] ${fn.name}:`,
                    error.message
                );

                throw error;
            }
        };
    };
}