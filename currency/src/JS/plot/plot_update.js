function updatePlot(data, currCode, layout) {

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


    Plotly.update('plot', {
        x: [formattedDates], y: [data[currCode]]
    }, layout);
}

function updateLayout(yaxis, TICK_NUMBERS = 5, PADDING_RATIO = 0.5) {
    const rangeMaxValue = Math.max(...yaxis) > 5 ? Math.max(...yaxis) : 5;
    const firstTick = Math.ceil(rangeMaxValue / TICK_NUMBERS);
    const padding = firstTick * PADDING_RATIO;

    const ticks = [];
    for (let i = 1; i <= 5; i++) {
        ticks.push(firstTick * i);
    }

    const layoutUpd = {
        yaxis: {
            range: [0, rangeMaxValue + padding], tickvals: ticks,
        },
    };

    return layoutUpd;
}

function drawPlot(curr,data) {
    const newLayout = updateLayout(data[curr]);
    updatePlot(data, curr, newLayout);
}

input.addEventListener('awesomplete-selectcomplete', async (event) => {
    const data = window.fileData
    const currCode = event.text.toUpperCase()
    drawPlot(currCode,data)
});

input.addEventListener('keydown', async (event) => {
    const data = window.fileData
    if (event.key === 'Enter') {
        const currCode = input.value.toUpperCase()
        drawPlot(currCode,data)
    }
});



