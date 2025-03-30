document.getElementById('tst').addEventListener('click', async () => {
  let data = null;

  try {
    const response = await fetch(`http://localhost:3001`);
    data = await response.json();
  } catch (error) {
    console.error('Помилка отримання даних:', error);
  }

  Plotly.update(
    'plot',
    { x: [data.dates], y: [data.rates] },
    getLayoutUpd(data.rates, 5, 0.5)
  );
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
