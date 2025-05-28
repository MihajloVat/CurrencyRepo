import {inputCodeFrom, inputCodeTo} from '../../references/input-refs.js'

const HUGE_NUMBER = 10000

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

export {awesomeFrom, awesomeTo};