const inputField = document.getElementById('currency-input');
const inputCodeFrom = document.getElementById('from-currency-code');
const inputCodeTo = document.getElementById('to-currency-code');

const HUGE_NUMBER = 10000

const awesomePlot = new Awesomplete(inputField, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});

const awesomeFrom = new Awesomplete(inputCodeFrom, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});

const awesomeTo = new Awesomplete(inputCodeTo, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});



