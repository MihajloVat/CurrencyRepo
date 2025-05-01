const updater = window.api.updater;
const input = document.getElementById('currency-input');

const TICK_NUMBER = 5;
const PADDING_RATIO = 0.5;

function updatePlot(currCode) {
    const data = window.fileData;

    if (!data[currCode]) {
        console.warn("Currency doesn't exist:", currCode);
        return;
    }

    const formattedDates = data.dates.map((str) => {
        const year = str.slice(0, 4);
        const month = str.slice(4, 6);
        const day = str.slice(6, 8);
        return `${year}-${month}-${day}`;
    });

    const updatedLayout = updater.getLayoutUpd(data[currCode], TICK_NUMBER, PADDING_RATIO);

    Plotly.update('plot', {
        x: [formattedDates],
        y: [data[currCode]]
    }, updatedLayout);
}

input.addEventListener('awesomplete-selectcomplete', (event) => {
    updatePlot(event.text.toUpperCase());
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        updatePlot(input.value.toUpperCase());
    }
});


