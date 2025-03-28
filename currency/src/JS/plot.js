const trace = {
  x: ['test'],
  y: [5],
  mode: 'lines+markers',
  type: 'scatter',
  line: {
    color: 'rgb(31, 150, 47)',
    width: 2,
  },
  marker: {
    color: 'rgb(11, 99, 45)',
    size: 7,
  },
};

const layout = {
  xaxis: {
    type: 'category',
    gridcolor: 'lightgray',
  },
  yaxis: {
    range: [0, 10],
    gridcolor: 'lightgray',
  },
  dragmode: false,
  showlegend: false,
  autosize: true,
  margin: {
    t: 40,
    b: 50,
    r: 50,
  },
};

const config = {
  doubleClick: false,
  scrollZoom: false,
  displayModeBar: false,
};

Plotly.newPlot('plot', [trace], layout, config);

document.getElementById('tst').addEventListener('click', async () => {
  let data = null;

  try {
    const response = await fetch('http://localhost:3000');
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

  trace.x = data.dates;
  trace.y = data.rates;

  console.log(trace.y);

  layout.yaxis.range = [0, rangeMaxValue + padding];
  layout.yaxis.tickvals = ticks;

  Plotly.react('plot', [trace], layout);
});
