const {dialog} = require('electron');

function throwAllert(title, message) {
    dialog.showMessageBox({
        type: 'info',
        title: `${title}`,
        message: `${message}`,
        buttons: ['OK']
    });
}

module.exports = {throwAllert}