const {
    NBUDataProvider,
    NBUDataProcessor,
    FileWriter,
} = require('./writer_modules');
const {getDates} = require('./date_getter');

const dates = getDates(120);

const dataProvider = new NBUDataProvider(dates);
const dataProcessor = new NBUDataProcessor();
const fileWriter = new FileWriter(
    'data.json',
    dataProvider,
    dataProcessor
);

fileWriter.write();

module.exports = { dates };
