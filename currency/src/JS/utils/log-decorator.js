function logger(fn, level = "INFO") {
    return function (...args) {
        const timestamp = new Date().toISOString();
        const isAsync = fn.constructor.name === "AsyncFunction";

        if (level === "DEBUG" || level === "INFO") {
            console.log(`[${timestamp}] [${level}] Calling ${fn.name} with args:`, args);
        }

        try {
            const result = fn(...args);

            if (isAsync && result instanceof Promise) {
                return result
                    .then(res => {
                        if (level === "DEBUG") {
                            console.log(`[${timestamp}] [${level}] ${fn.name} returned:`, res);
                        }
                        return res;
                    })
                    .catch(err => {
                        console.error(`[${timestamp}] [ERROR] ${fn.name} threw async error:`, err.message);
                        throw err;
                    });
            } else {
                if (level === "DEBUG") {
                    console.log(`[${timestamp}] [${level}] ${fn.name} returned:`, result);
                }
                return result;
            }

        } catch (err) {
            console.error(`[${timestamp}] [ERROR] ${fn.name} threw error:`, err.message);
            throw err;
        }
    };
}

module.exports = { logger };