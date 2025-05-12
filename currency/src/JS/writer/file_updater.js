const {getMonthsDifference} = require('./dates_tools');
const fs = require('fs').promises;

async function updateFile(path) {
    try {
        const fileData = await fs.readFile(path, 'utf8');
        const data = JSON.parse(fileData);

        const lastDateStr = data.dates[data.dates.length - 1];

        const difference = getMonthsDifference(lastDateStr);

        if (difference !== 0) {

        }

    } catch (error) {
        console.error(error)
    }
}