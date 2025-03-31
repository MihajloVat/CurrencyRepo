const http = require('http');
const { DataProvider, DataProcessor } = require('./server_modules');
const { config } = require('./config');

const dataProvider = new DataProvider();
const dataProcessor = new DataProcessor();

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const data = await dataProvider.getData('20250320', '20250322', 'USD');

    const filteredData = dataProcessor.process(data);

    res.end(JSON.stringify(filteredData));
  } catch {
    res.end(JSON.stringify({ error: 'failed' }));
  }
});

server.listen(config.PORT, config.HOSTNAME, (error) =>
  error ? console.log(error) : console.log('listening')
);
