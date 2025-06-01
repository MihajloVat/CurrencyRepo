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

function getDescriptionsFromFile(data,code) {
    return data.descriptions[code]
}

module.exports = {getDatesFromFile, getCodesFromFile, getValuesFromFile,getDescriptionsFromFile};