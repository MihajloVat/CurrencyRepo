const fs = require('fs').promises;
const {getDates} = require("./dates_getter");
const {NBUDataProvider, NBUDataProcessor, FileWriter} = require("./writer_modules");

async function writeFile(path) {
    try {
        await fs.access(path);
        console.log('exists');
        //...
    } catch (err) {
        if (err.code === 'ENOENT') {
            const dates = getDates();

            const provider = new NBUDataProvider(dates);
            const processor = new NBUDataProcessor();
            const writer = new FileWriter(provider, processor, path);

            await writer.write();
        } else {
            console.error("Помилка при перевірці файлу:", err);
            throw err;
        }
    }
}

module.exports = {writeFile};