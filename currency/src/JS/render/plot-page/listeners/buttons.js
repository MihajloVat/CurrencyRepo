inputField.addEventListener('focus', async () => {
    try {
        if (!window.fileData) {
            return
        }
        const keys = Object.keys(window.fileData);
        keys.shift()
        awesomePlot.list = keys;
        awesomePlot.maxItems = keys.length - 1;
        awesomePlot.evaluate();
    } catch (err) {
        console.log(err)
    }
});

inputField.addEventListener('awesomplete-selectcomplete', async (event) => {
    try {
        if (!window.fileData) {
            return
        }
        const currCode = event.text.toUpperCase()

        drawPlot(currCode, window.fileData)

        const statsUpdate = new StatsUpdate(window.fileData, currCode);
        statsUpdate.updateAll();
        inputField.value = '';
    } catch (err) {
        console.log(err)
    }
});

inputField.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        try {
            if (!window.fileData) {
                return
            }
            const currCode = inputField.value.toUpperCase()

            if (!window.fileData[currCode]) {
                inputField.value = '';
                return
            }

            drawPlot(currCode, window.fileData)

            const statsUpdate = new StatsUpdate(window.fileData, currCode);
            statsUpdate.updateAll();
            inputField.value = '';

            inputField.blur();
        } catch (err) {
            console.log(err)
        }
    }
});



