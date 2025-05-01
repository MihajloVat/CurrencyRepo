class Updater {
    getLayoutUpd(yaxis, tickNumber, paddingRatio) {
        const rangeMaxValue = Math.max(...yaxis) > 5 ? Math.max(...yaxis) : 5;
        const firstTick = Math.ceil(rangeMaxValue / tickNumber);
        const padding = firstTick * paddingRatio;

        const ticks = [];
        for (let i = 1; i <= 5; i++) {
            ticks.push(firstTick * i);
        }

        const layoutUpd = {
            yaxis: {
                range: [0, rangeMaxValue + padding],
                tickvals: ticks,
            },
        };

        return layoutUpd;
    }
}

module.exports = {Updater};
