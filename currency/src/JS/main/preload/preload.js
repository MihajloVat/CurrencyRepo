const {contextBridge, ipcRenderer} = require('electron');
const fs = require('fs').promises;
const {formatDates} = require('../../dates/dates_formatter')

contextBridge.exposeInMainWorld('tools', {
    readData: async () => {
        const filePath = await ipcRenderer.invoke('get-file-path');
        return await fs.readFile(filePath, 'utf-8');
    },

    formatDates,
});
