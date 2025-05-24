const {contextBridge, ipcRenderer} = require('electron');
const {formatDates} = require('../../utils/dates-formatter')

contextBridge.exposeInMainWorld('tools', {
    getFileData: async () => {
        return await ipcRenderer.invoke('get-file-data');
    },
    formatDates,
});
