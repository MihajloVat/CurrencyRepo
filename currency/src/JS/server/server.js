const {
  NBUDataProvider,
  NBUDataProcessor,
  Server,
} = require('./server_modules');
const { config } = require('./config');

const dataProvider = new NBUDataProvider();
const dataProcessor = new NBUDataProcessor();
const server = new Server(
  config.PORT,
  config.HOSTNAME,
  dataProvider,
  dataProcessor
);

server.create();
