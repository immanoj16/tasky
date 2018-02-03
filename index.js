const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const url = require('url');
const TimerTray = require('./app/timer_tray');

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

  tray = new TimerTray(iconPath);

  tray.on('click', (event, bounds) => {

    console.log(bounds.x, bounds.y);

    const { x, y } = bounds;

    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {

      const yPosition = process.platform === 'win32' ? y - height : y;

      mainWindow.setBounds({
        x: 980,  // x - width / 2
        y: yPosition,
        height,
        width
      });
      mainWindow.show()
    }
  });

  mainWindow.on('show', () => {
    tray.setHighlightMode('always')
  });

  mainWindow.on('hide', () => {
    tray.setHighlightMode('never')
  });
});
