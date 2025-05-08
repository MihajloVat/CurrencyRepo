const inputField = document.getElementById('currency-input');

const awesomplete = new Awesomplete(inputField, {
    list: [],
    maxItems: 1000,
    minChars: 0
});

inputField.addEventListener('focus', async () => {
    const keys = Object.keys(window.fileData);
    keys.shift()
    awesomplete.list = keys;
    awesomplete.maxItems = keys.length - 1;
    awesomplete.evaluate();
});

