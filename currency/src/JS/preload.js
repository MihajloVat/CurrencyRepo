const { contextBridge } = require('electron');
const { PORT, HOSTNAME } = require('./server');

contextBridge.exposeInMainWorld('api', {
  getURL: () => `http://${HOSTNAME}:${PORT}`,
});
