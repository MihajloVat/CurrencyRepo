const {dialog} = require('electron');

function throwAlert() {
    dialog.showMessageBox({
        type: 'info',
        title: 'Статус зʼєднання',
        message: 'Немає інтернету. Використовую локальні дані.',
        buttons: ['OK']
    });
}