const {contextBridge, ipcRenderer} = require('electron');
const fs = require('fs').promises;

contextBridge.exposeInMainWorld('api', {
    fileReader: {
        readData: async () => {
            const filePath = await ipcRenderer.invoke('get-file-path');
            return await fs.readFile(filePath, 'utf-8');
        }
    },
});
