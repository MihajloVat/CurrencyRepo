const {getDates} = require("../dates/date_getter");
const {NBUDataProvider, NBUDataProcessor, FileWriter} = require("./writer_modules");

async function writeFile(path){
    const dates = getDates();

    const provider = new NBUDataProvider(dates);
    const processor = new NBUDataProcessor();
    const writer = new FileWriter(provider, processor, path);

    await writer.write();
}

module.exports = {writeFile};