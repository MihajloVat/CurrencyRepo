const { DataProvider, NBUDataProcessor, Server } = require('./server_modules');
const { config, apiUrl } = require('./config');

const dataProvider = new DataProvider(apiUrl);
const dataProcessor = new NBUDataProcessor();
const server = new Server(
  config.PORT,
  config.HOSTNAME,
  dataProvider,
  dataProcessor
);

server.create();
