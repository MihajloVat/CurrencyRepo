require('../writer/writer');

const { app, BrowserWindow } = require('electron');
const path = require('path');

const indexPath = path.join(__dirname, '..', '..');

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
  win.loadFile(`${indexPath}/index.html`);
};

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
