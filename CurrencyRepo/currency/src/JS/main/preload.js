const { contextBridge } = require('electron');
const { config } = require('../server/config');
const { Updater } = require('../plot/updater');

const updater = new Updater();

contextBridge.exposeInMainWorld('api', {
  getURL: () => `http://${config.HOSTNAME}:${config.PORT}`,
  updater: {
    getLayoutUpd: (yaxis, tickNumber, paddingRatio) =>
      updater.getLayoutUpd(yaxis, tickNumber, paddingRatio),
  },
});
