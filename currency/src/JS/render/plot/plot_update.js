const TICK_NUMBER = 5
const PADDING_RATIO = 0.5

function updatePlot(data, currCode, layout) {

    if (!data[currCode]) {
        console.warn("Currency doesn't exist:", currCode);
        return;
    }

    const formattedDates = data.dates.map(window.tools.formatDates);

    Plotly.update('plot', {
        x: [formattedDates], y: [data[currCode]]
    }, layout);
}

function updateLayout(yaxis, tickNumber = TICK_NUMBER, paddingRatio = PADDING_RATIO) {
    const rangeMaxValue = Math.max(...yaxis) > 5 ? Math.max(...yaxis) : 5;
    const firstTick = Math.ceil(rangeMaxValue / tickNumber);
    const padding = firstTick * paddingRatio;

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

function drawPlot(currCode, data) {
    const newLayout = updateLayout(data[currCode]);
    updatePlot(data, currCode, newLayout);
}





