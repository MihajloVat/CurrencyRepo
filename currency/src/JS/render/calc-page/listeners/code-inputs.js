inputCodeFrom.addEventListener('focus', async () => {
    try {
        if (!window.fileData) {
            return
        }
        const keys = Object.keys(window.fileData);
        keys.shift()
        keys.push('UAH')
        awesomeFrom.list = keys;
        awesomeFrom.maxItems = keys.length - 1;
        awesomeFrom.evaluate();
    } catch (err) {
        console.log(err)
    }
});

inputCodeTo.addEventListener('focus', async () => {
    try {
        if (!window.fileData) {
            return
        }
        const keys = Object.keys(window.fileData);
        keys.shift()
        keys.push('UAH')
        awesomeTo.list = keys;
        awesomeTo.maxItems = keys.length - 1;
        awesomeTo.evaluate();
    } catch (err) {
        console.log(err)
    }
});

inputCodeFrom.addEventListener('awesomplete-selectcomplete', async () => {
    inputAmountFrom.dispatchEvent(new Event('input'));
});

inputCodeTo.addEventListener('awesomplete-selectcomplete', async () => {
    inputAmountFrom.dispatchEvent(new Event('input'));
});

inputCodeFrom.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        inputAmountFrom.dispatchEvent(new Event('input'));
        inputCodeFrom.value = inputCodeFrom.value.toUpperCase();
        inputCodeFrom.blur();
    }
});

inputCodeTo.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        inputAmountFrom.dispatchEvent(new Event('input'));
        inputCodeTo.value = inputCodeTo.value.toUpperCase();
        inputCodeTo.blur();
    }
});


/*
inputCodeFrom.addEventListener('change', () => {
    inputAmountFrom.dispatchEvent(new Event('input'));
});
-
inputCodeTo.addEventListener('change', () => {
    inputAmountFrom.dispatchEvent(new Event('input'));
});*/




