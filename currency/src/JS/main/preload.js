const {contextBridge, ipcRenderer} = require('electron');
const fs = require('fs').promises;
const path = require('path');
const {Updater} = require('../plot/updater');

const updater = new Updater();

contextBridge.exposeInMainWorld('api', {
    updater: {
        getLayoutUpd: (yaxis, tickNumber, paddingRatio) =>
            updater.getLayoutUpd(yaxis, tickNumber, paddingRatio),
    },
    fileReader: {
        readFile: async () => {
            const filePath = await ipcRenderer.invoke('get-file-path');
            return await fs.readFile(filePath, 'utf-8');
        }
    }
});
