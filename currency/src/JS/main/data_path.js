const {app} = require('electron');
const path = require("path");

const dataFilePath = path.join(app.getPath('userData'), 'data.json');

module.exports = {dataFilePath};
