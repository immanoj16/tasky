const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(option) {
    super(option);

    this.on('blur', this.onBlur.bind(this));
  }

  onBlur () {
    this.hide();
  }
}

module.exports = MainWindow;
