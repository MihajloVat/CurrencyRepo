const {contextBridge, ipcRenderer} = require('electron');
const {formatDates} = require('../../dates-formatter/dates-formatter')

contextBridge.exposeInMainWorld('tools', {
    getFileData: async () => {
        return await ipcRenderer.invoke('get-file-data');
    },
    formatDates,
});
