function getDatesFromFile(data) {
    return data.dates
}

function getCodesFromFile(data) {
    const codes = Object.keys(data);
    codes.shift()
    codes.shift()
    return codes;
}

function getValuesFromFile(data,code) {
    return data[code]
}

module.exports = {getDatesFromFile, getCodesFromFile, getValuesFromFile};