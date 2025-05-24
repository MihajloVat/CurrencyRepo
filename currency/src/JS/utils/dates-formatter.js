function formatDates(yymmdd) {
    const year = yymmdd.slice(0, 4)
    const month = yymmdd.slice(4, 6)
    const day = yymmdd.slice(6, 8)
    return `${year}-${month}-${day}`
}

module.exports = {formatDates}