const { contextBridge } = require('electron');
const { config } = require('./config');
const { Updater } = require('./updater');

const updater = new Updater();

contextBridge.exposeInMainWorld('api', {
  getURL: () => `http://${config.HOSTNAME}:${config.PORT}`,
  updater: {
    getLayoutUpd: (yaxis, tickNumber, paddingRatio) =>
      updater.getLayoutUpd(yaxis, tickNumber, paddingRatio),
  },
});
