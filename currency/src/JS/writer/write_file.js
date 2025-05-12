const fs = require('fs').promises;
const {getDates} = require("./dates_tools");
const {NBUDataProvider, NBUDataProcessor, FileWriter} = require("./writer_modules");

async function writeFile(path) {
    try {
        await fs.access(path);

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

module.exports = {writeFile};