const fs = require('fs').promises;
const path = require('path');

const LOG_PATH = "./debug/logs"

function getCallerFile() {
    const err = new Error();
    const stack = err.stack.split('\n');
    const callerLine = stack[3];

    const match = callerLine.match(/\((.*):\d+:\d+\)/) || callerLine.match(/at (.*):\d+:\d+/);
    if (match) {
        return path.basename(match[1]);
    }

    return null;
}

function logDecorator(fn, level = "INFO", logPath = LOG_PATH) {

    return (...args) => {
        const timestamp = new Date().toISOString();

        const start = Date.now();

        const logToFile = async (lvl,info) => {
            const logText = `[${timestamp}]/[${lvl}]/${info}\n`;
            try {
                await fs.mkdir(path.dirname(logPath), {recursive: true});
                await fs.appendFile(logPath, logText);
            } catch (err) {
                console.error("Failed to write log:", err.message);
            }
        };

        const handleResult = (res) => {
            const strArgs = JSON.stringify(...args)
            const basicInfo = `[${fn.name}]/[ARGS: (${strArgs})]`
            if (level === "DEBUG") {
                const execTime = Date.now() - start;
                const strRes = JSON.stringify(res)
                const call = getCallerFile();
                const extraInfo = `[RES: ${strRes}]/[CALL: ${call}]/[TIME:${execTime}ms]`;
                logToFile('DEBUG',`${basicInfo}/${extraInfo}`);
            } else {
                logToFile('INFO',`${basicInfo}`);
            }
            return res;
        };

        const handleError = (err) => {
            logToFile('ERROR',`[${fn.name}]/[${err.message}]`);
            throw err;
        };

        const result = fn(...args);
        if (result instanceof Promise) {
            return result.then(handleResult).catch(handleError);
        } else {
            try {
                return handleResult(result);
            } catch (err) {
                handleError(err)
            }
        }
    };
}


module.exports = {logDecorator};
