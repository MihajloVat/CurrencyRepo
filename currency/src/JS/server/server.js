const {
  NBUDataProvider,
  NBUDataProcessor,
  Server,
} = require('./server_modules');
const { config } = require('./config');
const { getDates } = require('./date_getter');

const dates = getDates();

const dataProvider = new NBUDataProvider(dates);
const dataProcessor = new NBUDataProcessor();
const server = new Server(
  config.PORT,
  config.HOSTNAME,
  dataProvider,
  dataProcessor
);

server.create();
