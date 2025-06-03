const {app} = require('electron');
const path = require('path');

const dataFilePath = path.join(app.getPath('userData'), 'data.json');
//const dataFilePath = `C:/Users/vatol/OneDrive/Робочий стіл/data.json`

const ALERT = {
    NO_INTERNET_HAS_FILE: {
        title: `Відсутнє з'єднання`,
        message: 'Дані завантажено з локального файлу',
    },
    NO_INTERNET_NO_FILE: {
        title: 'Помилка',
        message: `З'єднання відсутнє,локальні дані не знайдено`,
    },
    ERROR: {
        title: 'Помилка',
        message: 'Внутрішня помилка,спробуйте перезапустити застосунок',
    }
};

module.exports = {dataFilePath, ALERT};
