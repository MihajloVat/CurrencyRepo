const { contextBridge } = require('electron');
const { config } = require('./config');

contextBridge.exposeInMainWorld('api', {
  getURL: () => `http://${config.HOSTNAME}:${config.PORT}`,
});
