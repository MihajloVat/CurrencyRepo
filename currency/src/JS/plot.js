function renderPlot(xaxis, yaxis) {
  const trace = {
    x: xaxis,
    y: yaxis,
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

  //used in layout
  const TICKS_NUMBER = 5;
  const PADDING_RATIO = 0.5;

  const rangeMaxValue = Math.max(...trace.y);
  const firstTick = Math.ceil(rangeMaxValue / TICKS_NUMBER);
  const padding = firstTick * PADDING_RATIO;

  const ticks = [];
  for (let i = 1; i <= 5; i++) {
    ticks.push(firstTick * i);
  }

  const layout = {
    xaxis: {
      type: 'category',
      gridcolor: 'lightgray',
    },
    yaxis: {
      range: [0, rangeMaxValue + padding],
      gridcolor: 'lightgray',
      tickvals: ticks,
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
}

renderPlot(['test'], [5]);

document.getElementById('tst').addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000');
    const data = await response.json();

    if (!Array.isArray(data)) throw new Error('Некоректні дані');

    const dates = data.map((item) => item.exchangedate);
    const rates = data.map((item) => item.rate);

    renderPlot(dates, rates);
  } catch (error) {
    console.error('Помилка отримання даних:', error);
  }
});
