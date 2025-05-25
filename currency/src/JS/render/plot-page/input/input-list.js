const inputField = document.getElementById('currency-input');

const HUGE_NUMBER = 10000

const awesomplete = new Awesomplete(inputField, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});


