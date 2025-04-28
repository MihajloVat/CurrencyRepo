const { contextBridge } = require('electron');
const fs = require('fs').promises;
const path = require('path');
const { Updater } = require('../plot/updater');
const { dates } = require('../writer/writer');

const updater = new Updater();

contextBridge.exposeInMainWorld('api', {
  updater: {
    getLayoutUpd: (yaxis, tickNumber, paddingRatio) =>
        updater.getLayoutUpd(yaxis, tickNumber, paddingRatio),
  },
  fileReader: {
    readFile: async (fileName) => {
      const filePath = path.join(__dirname, '..', '..','..', fileName);
      return await fs.readFile(filePath, 'utf-8');
    },
  },
  dates: dates,
});
