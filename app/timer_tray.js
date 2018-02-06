const { Tray } = require('electron');

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');
    this.on('click', this.onClick.bind(this));
  }

  onClick (event, bounds) {
    const { x, y } = bounds;

    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide()
    } else {

      const yPosition = process.platform === 'win32' ? y - height : y;

      this.mainWindow.setBounds({
        x: 980,  // x - width / 2
        y: yPosition,
        height,
        width
      });
      this.mainWindow.show()
    }
  }
}

module.exports = TimerTray;