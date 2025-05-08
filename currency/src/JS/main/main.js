const {
    NBUDataProvider,
    NBUDataProcessor,
    FileWriter
} = require('../writer/writer_modules');
const { getDates } = require('../dates/date_getter')
const {dataFilePath}=require('./data_path');

const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload/preload.js'),
            nodeIntegration: true,
        },
    });
    win.setMenuBarVisibility(false);
    win.setTitle('Currency');
    win.loadFile(path.join(__dirname, '..', '..', 'index.html'));

    win.webContents.openDevTools();
};

app.whenReady().then(async () => {
    const dates = getDates();

    const provider = new NBUDataProvider(dates);
    const processor = new NBUDataProcessor();
    const writer = new FileWriter(provider, processor,dataFilePath);

    await writer.write();

    ipcMain.handle('get-file-path', () => {
        return dataFilePath;
    });

    createWindow();
});

app.on('window-all-closed', () => {
    app.quit();
});
