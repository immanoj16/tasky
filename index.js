const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;
let tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);

  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  });

  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  });

  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  });
});
