const {contextBridge, ipcRenderer} = require('electron');
const {formatDates} = require('../../dates_formatter/dates_formatter')

contextBridge.exposeInMainWorld('tools', {
    getFileData: async () => {
        return await ipcRenderer.invoke('get-file-data');
    },
    formatDates,
});
