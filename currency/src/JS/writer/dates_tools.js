const {MONTH_BACK} = require('./config')

function getDates(monthBack = MONTH_BACK) {
    const dates = [];

    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;

    for (let i = 0; i < monthBack; i++) {
        const yearString = year.toString();
        const monthString = month < 10 ? '0' + month : month.toString();
        dates.push(yearString + monthString + '01');

        month--;
        if (month === 0) {
            month = 12;
            year--;
        }
    }

    return dates.reverse();
}

function getMonthsDifference(lastDateStr) {
    const lastDateYear = parseInt(lastDateStr.substring(0, 4));
    const lastDateMonth = parseInt(lastDateStr.substring(4, 6));

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    if (lastDateYear >= currentYear && lastDateMonth >= currentMonth) {
        return 0;
    }

    const lastDate = new Date(lastDateYear, lastDateMonth - 1);
    const yearsDifference = currentYear - lastDate.getFullYear();
    const monthsDifference = currentMonth - (lastDateMonth);

    return yearsDifference * 12 + monthsDifference;
}

module.exports = {getDates, getMonthsDifference};
