const {
    NBUDataProvider,
    NBUDataProcessor,
    FileWriter
} = require('../writer/writer_modules');
const {getDates} = require('../writer/date_getter');
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 500,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
        },
    });
    win.setMenuBarVisibility(false);
    win.setTitle('Currency');
    win.loadFile(path.join(__dirname, '..', '..', 'index.html'));
};

const dataFilePath = path.join(app.getPath('userData'), 'data.json');

app.whenReady().then(async () => {
    const dates = getDates(120);

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
