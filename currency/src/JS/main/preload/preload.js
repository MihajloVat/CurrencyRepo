const {contextBridge, ipcRenderer} = require('electron');
const fs = require('fs').promises;
const {formatDates} = require('../../dates_formatter/dates_formatter')

contextBridge.exposeInMainWorld('tools', {
    readData: async () => {
        const filePath = await ipcRenderer.invoke('get-file-path');
        console.log(filePath);
        return await fs.readFile(filePath, 'utf-8');
    },

    formatDates,
});
