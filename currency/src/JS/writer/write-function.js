const fs = require('fs').promises;
const {getDates, getMonthsDifference} = require("./dates_tools");
const {NBUDataProvider, NBUProcUpdater, NBUDataProcessor, FileWriter} = require("./writer-modules");
const {logDecorator} = require("../utils/log-decorator");


async function updateFile(path) {
    try {
        await fs.access(path);

        const fileData = await fs.readFile(path, 'utf8');
        const data = JSON.parse(fileData);

        const lastDateStr = data.dates[data.dates.length - 1];

        const difference = getMonthsDifference(lastDateStr);

        if (difference !== 0) {
            const dates = getDates(difference);
            const provider = new NBUDataProvider(dates);
            const processor = new NBUProcUpdater(data, difference);
            const writer = new FileWriter(provider, processor, path);

            await writer.write();

        }

    } catch (err) {
        if (err.code === 'ENOENT') {
            const dates = getDates();

            const provider = new NBUDataProvider(dates);
            const processor = new NBUDataProcessor();
            const writer = new FileWriter(provider, processor, path);

            await writer.write();

        } else {
            console.error("error while file writing (writeFile function):", err);
        }
    }
}

module.exports = {updateFile: logDecorator(updateFile, 'DEBUG')};