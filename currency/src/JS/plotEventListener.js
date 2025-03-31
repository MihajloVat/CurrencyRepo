document.getElementById('tst').addEventListener('click', async () => {
  const lochostURL = window.api.getURL();
  let data = null;

  try {
    const response = await fetch(lochostURL);
    data = await response.json();
  } catch (error) {
    console.error('Помилка отримання даних:', error);
  }

  const UpdatedLayout = getLayoutUpd(data.rates, 5, 0.5);

  Plotly.update('plot', { x: [data.dates], y: [data.rates] }, UpdatedLayout);
});

function getLayoutUpd(yaxis, tickNumber, paddingRatio) {
  const rangeMaxValue = Math.max(...yaxis);
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
