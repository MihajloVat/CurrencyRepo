const { app, BrowserWindow } = require('electron');
const { execFile } = require('child_process');
const path = require('path');

let serverProcess = null;
const serverPath = path.dirname(__filename);
const indexPath = path.join(__dirname, '..');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 500,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.setMenuBarVisibility(false);
  win.setTitle('Currency');
  win.loadFile(`${indexPath}/index.html`);
};

app.whenReady().then(() => {
  serverProcess = execFile('node', [`${serverPath}/server.js`]);

  createWindow();
});

app.on('window-all-closed', () => {
  serverProcess.kill();
  app.quit();
});
