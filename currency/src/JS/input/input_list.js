const input = document.getElementById('currency-input');

const awesomplete = new Awesomplete(input, {
    list: [],
    maxItems: 1000,
    minChars: 0
});

input.addEventListener('focus', async () => {
    const keys = Object.keys(window.fileData);
    keys.shift()
    awesomplete.list = keys;
    awesomplete.maxItems = keys.length - 1;
    awesomplete.evaluate();
});

