const { DataProvider, DataProcessor, Server } = require('./server_modules');
const { config } = require('./config');

const dataProvider = new DataProvider();
const dataProcessor = new DataProcessor();
const server = new Server(
  config.PORT,
  config.HOSTNAME,
  dataProvider,
  dataProcessor
);

server.create();
