const { Tray } = require('electron');

class TimerTray extends Tray {
  constructor(iconPath) {
    super(iconPath)
  }
}

module.exports = TimerTray;