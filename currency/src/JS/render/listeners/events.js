inputField.addEventListener('focus', async () => {
    try {
        const keys = Object.keys(window.fileData);
        keys.shift()
        awesomplete.list = keys;
        awesomplete.maxItems = keys.length - 1;
        awesomplete.evaluate();
    } catch (err) {
        console.log(err)
    }
});

inputField.addEventListener('awesomplete-selectcomplete', async (event) => {
    try {
        const currCode = event.text.toUpperCase()
        drawPlot(currCode, window.fileData)

        const statsUpdate = new StatsUpdate(window.fileData, inputField.value);
        statsUpdate.updateAll();
        inputField.value = '';
    } catch (err) {
        console.log(err)
    }
});

inputField.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        try {
            const currCode = event.text.toUpperCase()
            drawPlot(currCode, window.fileData)

            const statsUpdate = new StatsUpdate(window.fileData, inputField.value);
            statsUpdate.updateAll();
            inputField.value = '';
        } catch (err) {
            console.log(err)
        }
    }
});



