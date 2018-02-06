const { app, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const TimerTray = require('./app/timer-tray');
const MainWindow = require('./app/main-window');

let mainWindow;
let tray;

app.on('ready', () => {

  if (process.platform === 'darwin')
    app.dock.hide();

  const options = {
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: { backgroundThrottling: false }
  };

  mainWindow = new MainWindow(options);

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './src/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new TimerTray(iconPath, mainWindow);

  ipcMain.on('update:timer', (event, timeLeft) => {
    if (process.platform === 'darwin')
      tray.setTitle(timeLeft);
  })

});
