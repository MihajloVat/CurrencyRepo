class StatsUpdate {
    constructor(data, currCode) {
        this.currCode = currCode;
        this.data = data;
    }

    updateText(id, item) {
        const place = document.getElementById(id);
        if (place) {
            place.textContent = item;
        } else {
            console.warn(`Element with ID "${id}" not found.`);
        }
    }

    placeCode(id) {
        this.updateText(id, this.currCode);
    }

    placeRange(id) {
        const dates = this.data.dates;
        if (!dates || dates.length === 0) return;
        const first = formatDates(dates[0]).replaceAll('-','.');
        const last = formatDates(dates[dates.length - 1]).replaceAll('-','.');
        this.updateText(id, `${first} - ${last}`);
    }

    placeMin(id) {
        const values = this.data[this.currCode];
        if (!values || values.length === 0) return;
        const min = Math.min(...values).toFixed(2)
        this.updateText(id, min);
    }

    placeMax(id) {
        const values = this.data[this.currCode];
        if (!values || values.length === 0) return;
        const max = Math.max(...values).toFixed(2)
        this.updateText(id, max);
    }

    placeAvg(id) {
        const values = this.data[this.currCode];
        if (!values || values.length === 0) return;
        const sum = values.reduce((acc, cur) => acc + cur, 0);
        this.updateText(id, (sum / values.length).toFixed(2));
    }

    updateAll(idMap) {
        this.placeCode(idMap.code);
        this.placeRange(idMap.range);
        this.placeMin(idMap.min);
        this.placeMax(idMap.max);
        this.placeAvg(idMap.avg);
    }
}

const idMap = {
    code: 'currency-code',
    range: 'dates-range',
    min: 'min-value',
    max: 'max-value',
    avg: 'avg-value'
};

input.addEventListener('awesomplete-selectcomplete', () => {
    const statsUpdate = new StatsUpdate(window.fileData, input.value);
    statsUpdate.updateAll(idMap);
    input.value = '';
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const statsUpdate = new StatsUpdate(window.fileData, input.value);
        statsUpdate.updateAll(idMap);
        input.value = '';
    }
});
