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
