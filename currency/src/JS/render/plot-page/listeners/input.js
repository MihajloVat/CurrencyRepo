import {drawPlot} from '../plot/draw-plot.js';
import {StatsUpdate} from '../stats/stats_update.js';
import {awesomePlot} from "./awesome.js";
import {inputPlot} from '../../references/input-refs.js'

inputPlot.addEventListener('focus', async () => {
    try {
        if (!window.fileData) {
            return
        }
        const keys = window.tools.getCodesFromFile(window.fileData)

        awesomePlot.list = keys.map(key => {
            return {
                label: `${key} (${window.tools.getDescriptionsFromFile(window.fileData, key)})`,
                value: key
            };
        });

        awesomePlot.maxItems = keys.length - 1;
        awesomePlot.evaluate();
    } catch (err) {
        console.log(err)
    }
});

inputPlot.addEventListener('awesomplete-selectcomplete', async (event) => {
    try {
        if (!window.fileData) {
            return
        }
        const text = event.text.toUpperCase()
        const currCode = text.slice(0, 3)
        console.log(currCode)

        drawPlot(currCode, window.fileData)

        const statsUpdate = new StatsUpdate(window.fileData, currCode);
        statsUpdate.updateAll();
        inputPlot.value = '';
    } catch (err) {
        console.log(err)
    }
});

inputPlot.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
        try {
            const currCode = inputPlot.value.toUpperCase()

            if (!window.fileData[currCode]) {
                inputPlot.value = '';
                return
            }

            drawPlot(currCode, window.fileData)

            const statsUpdate = new StatsUpdate(window.fileData, currCode);
            statsUpdate.updateAll();
            inputPlot.value = '';

            inputPlot.blur();
        } catch (err) {
            console.log(err)
        }
    }
});



