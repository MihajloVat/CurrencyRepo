import {inputPlot} from '../../references/input-refs.js'

const HUGE_NUMBER = 10000

const awesomePlot = new Awesomplete(inputPlot, {
    list: [],
    maxItems: HUGE_NUMBER,
    minChars: 0
});

export {awesomePlot}
