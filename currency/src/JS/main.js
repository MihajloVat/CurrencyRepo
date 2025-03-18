const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 500,
    resizable: false,
    titleBarStyle: 'hiddenInset',
  });
  win.setMenuBarVisibility(false);
  win.setTitle('Timer');
  win.loadFile('src/index.html');
};
app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());
