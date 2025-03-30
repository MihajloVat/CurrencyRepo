document.getElementById('tst').addEventListener('click', async () => {
  let data = null;

  try {
    const response = await fetch('http://localhost:3001');
    data = await response.json();
  } catch (error) {
    console.error('Помилка отримання даних:', error);
  }

  const TICKS_NUMBER = 5;
  const PADDING_RATIO = 0.5;

  const rangeMaxValue = Math.max(...data.rates);
  const firstTick = Math.ceil(rangeMaxValue / TICKS_NUMBER);
  const padding = firstTick * PADDING_RATIO;

  const ticks = [];
  for (let i = 1; i <= 5; i++) {
    ticks.push(firstTick * i);
  }

  const layoutUpd = {
    'layout.yaxis.range': [0, rangeMaxValue + padding],
    ' layout.yaxis.tickvals': ticks,
  };

  layout.yaxis.range = [0, rangeMaxValue + padding];
  layout.yaxis.tickvals = ticks;

  Plotly.update('plot', { x: [data.dates], y: [data.rates] }, layoutUpd);
});
