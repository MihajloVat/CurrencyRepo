const input_list = document.getElementById('currency-input');

const awesomplete = new Awesomplete(input_list, {
    list: [],
    maxItems: 1000,
    minChars: 0
});

input_list.addEventListener('focus', async () => {
    const keys = Object.keys(window.fileData);
    keys.shift()
    awesomplete.list = keys;
    awesomplete.maxItems = keys.length - 1;
    awesomplete.evaluate();
});

