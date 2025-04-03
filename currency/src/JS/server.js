const { DataProvider, DataProcessor, Server } = require('./server_modules');
const { config, apiUrl } = require('./config');

const dataProvider = new DataProvider(apiUrl);
const dataProcessor = new DataProcessor();
const server = new Server(
  config.PORT,
  config.HOSTNAME,
  dataProvider,
  dataProcessor
);

server.create();
