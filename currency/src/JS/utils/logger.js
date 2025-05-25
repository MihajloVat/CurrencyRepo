const fs = require('fs').promises;
const path = require('path');

const LOG_PATH = "./debug/logs.jsonl";

const getCallerFile = () => {
    const err = new Error();
    const stack = err.stack.split('\n');
    const callerLine = stack[3];

    const match = callerLine.match(/\((.*):\d+:\d+\)/) || callerLine.match(/at (.*):\d+:\d+/);

    //console.log(new Error().stack);

    if (match) {
        return path.basename(match[1]);
    }

    return null;
}

const logToFile = async (timestamp, level, infoObj, logPath = LOG_PATH) => {
    const logEntry = {
        timestamp,
        level,
        ...infoObj
    };
    const logText = JSON.stringify(logEntry) + "\n";
    try {
        await fs.mkdir(path.dirname(logPath), {recursive: true});
        await fs.appendFile(logPath, logText);
    } catch (err) {
        console.error("Failed to write log:", err.message);
    }
};

const handleResult = (res, level, timestamp, startTime, infoObj) => {
    const call = getCallerFile();

    if (level === "DEBUG") {
        const execTime = Date.now() - startTime;
        Object.assign(infoObj, {
            result: res,
            caller: call,
            execTimeMs: execTime
        });
        logToFile(timestamp, "DEBUG", infoObj);
    } else {
        logToFile(timestamp, "INFO", infoObj);
    }
    return res;
};

const handleError = (err, timestamp, infoObj) => {
    Object.assign(infoObj, {
        error: err.message,
    });
    logToFile(timestamp, "ERROR", infoObj);
    throw err;
};

function logger(fn, level = "INFO", logPath = LOG_PATH) {

    return (...args) => {
        const timestamp = new Date().toISOString();
        const startTime = Date.now();

        const infoObj = {
            function: fn.name,
            args: args,
        }

        const result = fn(...args);
        if (result instanceof Promise) {
            return result
                .then((res) => handleResult(res, level, timestamp, startTime, infoObj))
                .catch((err) => handleError(err, timestamp, infoObj));
        } else {
            try {
                return handleResult(result, level, timestamp, startTime, infoObj);
            } catch (err) {
                handleError(err, timestamp, infoObj);
            }
        }
    };
}

module.exports = {logDecorator: logger};