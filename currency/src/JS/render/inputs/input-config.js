const inputField = document.getElementById('currency-input');
const inputFrom = document.getElementById('from-currency-code');
const inputTo = document.getElementById('to-currency-code');

const HUGE_NUMBER = 10000

const awesomePlot = new Awesomplete(inputField, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});

const awesomeFrom = new Awesomplete(inputFrom, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});

const awesomeTo = new Awesomplete(inputTo, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});



