const http = require('http');
const DataProvider = require('./provider');

const PORT = 3001;
const dataProvider = new DataProvider();

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const data = await dataProvider.getData('20250320', '20250322', 'USD');

    const filteredData = dataFilter(data);

    res.end(JSON.stringify(filteredData));
  } catch {
    res.end(JSON.stringify({ error: 'failed' }));
  }
});

server.listen(PORT, 'localhost', (error) =>
  error ? console.log(error) : console.log('listening')
);

function dataFilter(rawData) {
  const dates = rawData.map((item) => item.exchangedate);
  const rates = rawData.map((item) => item.rate);

  const output = {
    dates,
    rates,
  };

  return output;
}

module.exports = { PORT };
