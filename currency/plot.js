const trace = {
  x: ['2020-10-04', '2021-11-04', '2023-12-04'],
  y: [80, 40, 60],
  mode: 'lines+markers',
  type: 'scatter',
  line: {
    color: 'rgb(38, 129, 50)',
    width: 2,
  },
  marker: {
    color: 'rgb(13, 87, 22)',
    size: 7,
  },
};

const layout = {
  showlegend: false,
  xaxis: {
    type: 'category',
    gridcolor: 'lightgray',
  },
  yaxis: {
    range: [0, Math.max(...trace.y) + 10],
    gridcolor: 'lightgray',
  },
  shapes: [
    // vert left line
    {
      type: 'line',
      x0: trace.x[0],
      x1: trace.x[0],
      y0: 0,
      y1: Math.max(...trace.y),
      line: {
        color: 'rgb(110, 110, 110)',
        width: 2,
      },
    },
    // vert right line
    {
      type: 'line',
      x0: trace.x[trace.x.length - 1],
      x1: trace.x[trace.x.length - 1],
      y0: 0,
      y1: Math.max(...trace.y),
      line: {
        color: 'rgb(110, 110, 110)',
        width: 2,
      },
    },
    // gorizont up line
    {
      type: 'line',
      x0: trace.x[0],
      x1: trace.x[trace.x.length - 1],
      y0: Math.max(...trace.y),
      y1: Math.max(...trace.y),
      line: {
        color: 'rgb(110, 110, 110)',
        width: 2,
      },
    },
    //gorizont down line
    {
      type: 'line',
      x0: trace.x[0],
      x1: trace.x[trace.x.length - 1],
      y0: 0,
      y1: 0,
      line: {
        color: 'rgb(110, 110, 110)',
        width: 5,
      },
    },
  ],
  autosize: true,
  margin: {
    t: 40,
    b: 50,
    r: 50, // Зменшуємо верхній відступ
  },
};

const config = {
  scrollZoom: false,
  displayModeBar: false,
};

Plotly.newPlot('plot', [trace], layout, config);
