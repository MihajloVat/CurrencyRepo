const trace = {
    x: ['', ' ', '   '],
    y: [4, 2, 3],
    mode: 'lines+markers',
    type: 'scatter',
    line: {
        color: 'rgb(31, 150, 47)',
        width: 2,
    },
    marker: {
        color: 'rgb(11, 99, 45)',
        size: 5,
    },
};

const layout = {
    xaxis: {
        type: 'category',
        gridcolor: 'lightgray',
    },
    yaxis: {
        range: [0, 5.5],
        gridcolor: 'lightgray',
    },
    dragmode: false,
    showlegend: false,
    autosize: true,
    width: 750,
    height: 438,
    margin: {
        t: 40,
        b: 50,
        r: 80,
    },
};

const config = {
    doubleClick: false,
    scrollZoom: false,
    displayModeBar: false,
};

Plotly.newPlot('plot', [trace], layout, config);
