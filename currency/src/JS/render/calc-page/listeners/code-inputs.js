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




