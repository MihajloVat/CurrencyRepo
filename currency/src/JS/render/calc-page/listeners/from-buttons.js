inputFrom.addEventListener('focus', async () => {
    try {
        if (!window.fileData) {
            return
        }
        const keys = Object.keys(window.fileData);
        keys.shift()
        awesomeFrom.list = keys;
        awesomeFrom.maxItems = keys.length - 1;
        awesomeFrom.evaluate();
    } catch (err) {
        console.log(err)
    }
});




