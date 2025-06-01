const {contextBridge, ipcRenderer} = require('electron');
const {formatDates} = require('../../utils/dates-formatter')
const {getDatesFromFile, getCodesFromFile, getValuesFromFile} = require('../../utils/file-struct-tools')

contextBridge.exposeInMainWorld('tools', {
    getFileData: async () => {
        return await ipcRenderer.invoke('get-file-data');
    },
    formatDates,
    getDatesFromFile,
    getCodesFromFile,
    getValuesFromFile
});
