const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
let serverProcess = null;

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
  win.loadFile('src/index.html');
};

app.whenReady().then(() => {
  serverProcess = spawn('node', ['src/JS/server.js'], { detached: true });
  createWindow();
});

app.on('window-all-closed', () => {
  serverProcess.kill();
  app.quit();
});
