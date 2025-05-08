class StatsUpdate {
    #idMap = {
        code: 'currency-code',
        range: 'dates-range',
        min: 'min-value',
        max: 'max-value',
        avg: 'avg-value'
    };

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
        this.updateText(id, `1 ${this.currCode} → UAH`);
    }

    placeRange(id) {
        const dates = this.data.dates;
        if (!dates || dates.length === 0) return;
        const first = formatDates(dates[0]).replaceAll('-', '.');
        const last = formatDates(dates[dates.length - 1]).replaceAll('-', '.');
        this.updateText(id, `${first} - ${last}`);
    }

    placeMin(id) {
        const values = this.data[this.currCode];
        if (!values || values.length === 0) return;
        const min = Math.min(...values).toFixed(2)
        this.updateText(id, `${min} UAH`);
    }

    placeMax(id) {
        const values = this.data[this.currCode];
        if (!values || values.length === 0) return;
        const max = Math.max(...values).toFixed(2)
        this.updateText(id, `${max} UAH`);
    }

    placeAvg(id) {
        const values = this.data[this.currCode];
        if (!values || values.length === 0) return;
        const sum = values.reduce((acc, cur) => acc + cur, 0);
        const avg = (sum / values.length).toFixed(2)
        this.updateText(id, `${avg} UAH`);
    }

    updateAll() {
        this.placeCode(this.#idMap.code);
        this.placeRange(this.#idMap.range);
        this.placeMin(this.#idMap.min);
        this.placeMax(this.#idMap.max);
        this.placeAvg(this.#idMap.avg);
    }
}

inputField.addEventListener('awesomplete-selectcomplete', () => {
    const statsUpdate = new StatsUpdate(window.fileData, inputField.value);
    statsUpdate.updateAll();
    inputField.value = '';
});

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const statsUpdate = new StatsUpdate(window.fileData, inputField.value);
        statsUpdate.updateAll();
        inputField.value = '';
    }
});
