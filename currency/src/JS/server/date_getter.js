function getDates(monthsBack = 120) {
  const dates = [];

  const now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;

  for (let i = 0; i < monthsBack; i++) {
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

module.exports = { getDates };
