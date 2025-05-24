const fs = require('fs').promises;
const path = require('path');

const LOG_PATH = "./debug/logs.jsonl";

function getCallerFile() {
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

function logger(fn, level = "INFO", logPath = LOG_PATH) {

    return (...args) => {
        const timestamp = new Date().toISOString();
        const start = Date.now();

        const infoObj = {
            function: fn.name,
            args: args,
        };

        const logToFile = async (level, infoObj) => {
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

        const handleResult = (res) => {
            const call = getCallerFile();

            if (level === "DEBUG") {
                const execTime = Date.now() - start;
                Object.assign(infoObj, {
                    result: res,
                    caller: call,
                    execTimeMs: execTime
                });
                logToFile("DEBUG", infoObj);
            } else {
                logToFile("INFO", infoObj);
            }
            return res;
        };

        const handleError = (err) => {
            Object.assign(infoObj, {
                error:err.message ,
            });
            logToFile("ERROR", infoObj);
            throw err;
        };

        const result = fn(...args);
        if (result instanceof Promise) {
            return result.then(handleResult).catch(handleError);
        } else {
            try {
                return handleResult(result);
            } catch (err) {
                handleError(err);
            }
        }
    };
}

module.exports = {logDecorator: logger};