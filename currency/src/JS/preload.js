const { contextBridge } = require('electron');
const { PORT } = require('./server');

contextBridge.exposeInMainWorld('api', {
  getPort: () => PORT,
});
