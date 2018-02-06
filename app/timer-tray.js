const { app, Tray, Menu } = require('electron');

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip('Timer');
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick (event, bounds) {
    const { x, y } = bounds;

    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const xPos = process.platform === 'win32' ? x : 980;
      const yPos = process.platform === 'win32' ? y - height : y;

      this.mainWindow.setBounds({
        x: xPos,
        y: yPos,
        height,
        width
      });
      this.mainWindow.show();
    }
  }

  onRightClick () {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
