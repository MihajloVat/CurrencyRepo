import {inputCodeFrom, inputAmountTo, inputAmountFrom, inputCodeTo} from '../../references/input-refs.js'

inputAmountFrom.addEventListener('input', async () => {
    const amount = inputAmountFrom.value

    if (amount === '') {
        inputAmountTo.value = '';
        return
    }

    const codeFrom = inputCodeFrom.value.toUpperCase();
    const codeTo = inputCodeTo.value.toUpperCase();

    if (!codeFrom || !codeTo) {
        return;
    }

    let rateFrom = null
    let rateTo = null

    if (codeFrom === 'UAH') {
        rateFrom = 1;
    } else {
        const codeFromData = window.tools.getValuesFromFile(window.fileData, codeFrom)
        rateFrom = codeFromData[codeFromData.length - 1]
    }

    if (codeTo === 'UAH') {
        rateTo = 1
    } else {
        const codeToData =  window.tools.getValuesFromFile(window.fileData, codeTo)
        rateTo = codeToData[codeToData.length - 1]
    }

    const res = amount * rateFrom / rateTo

    inputAmountTo.value = res.toFixed(2);
});



