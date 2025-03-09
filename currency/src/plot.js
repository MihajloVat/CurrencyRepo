const trace = {
  x: ['2020-10-04', '2021-11-04', '2023-12-04'],
  y: [80, 40, 60],
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
  showlegend: false,
  xaxis: {
    type: 'category',
    gridcolor: 'lightgray',
  },
  yaxis: {
    range: [0, Math.max(...trace.y) + 5],
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
  scrollZoom: false,
  displayModeBar: false,
};

Plotly.newPlot('plot', [trace], layout, config);
