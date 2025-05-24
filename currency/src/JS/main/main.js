const {updateFile} = require('../writer/write-function')
const {dataFilePath} = require('./data-path')
const {app, BrowserWindow, dialog, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs').promises;


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload/preload.js'),
            nodeIntegration: true
        },
    });
    win.setMenuBarVisibility(false);
    win.setTitle('Currency');
    win.loadFile(path.join(__dirname, '..', '..', 'index.html'));

    win.webContents.openDevTools();
};

app.whenReady().then(async () => {

    await updateFile(dataFilePath);

    const fileData = await fs.readFile(dataFilePath, 'utf-8');

    ipcMain.handle('get-file-data', () => {
        return fileData
    });

    createWindow();
}).catch(error => {
    console.error(error)
});

app.on('window-all-closed', () => {
    app.quit();
});