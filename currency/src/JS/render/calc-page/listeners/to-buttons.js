inputTo.addEventListener('focus', async () => {
    try {
        if (!window.fileData) {
            return
        }
        const keys = Object.keys(window.fileData);
        keys.shift()
        awesomeTo.list = keys;
        awesomeTo.maxItems = keys.length - 1;
        awesomeTo.evaluate();
    } catch (err) {
        console.log(err)
    }
});