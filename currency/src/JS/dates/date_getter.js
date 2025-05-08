const MONTH_BACK = 120

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

module.exports = {getDates};
