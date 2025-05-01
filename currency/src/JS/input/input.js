const input = document.getElementById('currency-input');
const fileReader = window.api.fileReader;

const awesomplete = new Awesomplete(input, {
    list: [],
    maxItems: 1000,
    minChars: 0
});

(async () => {
    try {
        const fileContent = await fileReader.readFile();
        window.fileData = JSON.parse(fileContent);
    } catch (error) {
        console.error(error)
    }
})()

input.addEventListener('focus', async () => {
    const keys = Object.keys(window.fileData);
    keys.shift()
    awesomplete.list = keys;
    awesomplete.maxItems = keys.length - 1;
    awesomplete.evaluate();
});
