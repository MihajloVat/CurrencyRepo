const {updateFile} = require('../writer/update-function')
const {dataFilePath, ALERT} = require('./config')
const {checkInternet} = require('../utils/check-inet')
const {throwAllert} = require('../utils/allerter')
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fse = require('fs-extra');


const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload/preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        },
    });
    win.setMenuBarVisibility(false);
    win.setTitle('Currency');
    win.loadFile(path.join(__dirname, '..', '..', 'index.html'));

    //win.webContents.openDevTools();
};

app.whenReady().then(async () => {
    let fileData = null

    const isOnline = await checkInternet();
    const isFile = await fse.pathExists(dataFilePath)

    if (isOnline) {
        await updateFile(dataFilePath, isFile);

        fileData = await fs.readFile(dataFilePath, 'utf-8');
    } else if (isFile) {
        fileData = await fs.readFile(dataFilePath, 'utf-8');

        throwAllert(ALERT.NO_INTERNET_HAS_FILE.title, ALERT.NO_INTERNET_HAS_FILE.message)
    } else {
        throwAllert(ALERT.NO_INTERNET_NO_FILE.title, ALERT.NO_INTERNET_NO_FILE.message)
    }

    ipcMain.handle('get-file-data', () => {
        return fileData
    });

    createWindow();
}).catch(() => {
    throwAllert(ALERT.ERROR.title, ALERT.ERROR.message)
});

app.on('window-all-closed', () => {
    app.quit();
});