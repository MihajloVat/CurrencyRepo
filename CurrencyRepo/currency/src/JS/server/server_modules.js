const http = require('http');

class Server {
  constructor(port, hostname, providerInstance, processorInstance) {
    this.port = port;
    this.hostname = hostname;
    this.providerInstance = providerInstance;
    this.processorInstance = processorInstance;
  }

  create() {
    const server = http.createServer(async (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');

      try {
        const data = await this.providerInstance.getData();

        const processedData = this.processorInstance.process(data);

        res.end(JSON.stringify(processedData));
      } catch {
        res.end(JSON.stringify({ error: 'failed' }));
      }
    });

    server.listen(this.port, this.hostname, (error) =>
      error
        ? console.log(error)
        : console.log(`Server running at http://${this.hostname}:${this.port}/`)
    );
  }
}

class DataProvider {
  getData() {
    throw new Error('Method not implemented');
  }
}

class DataProcessor {
  process(rawData) {
    throw new Error('Method not implemented');
  }
}

class NBUDataProcessor extends DataProcessor {
  process(rawData) {
    const output = { dates: rawData.dates };

    for (const dailyData of rawData.data) {
      for (const currency of dailyData) {
        const code = currency.cc;
        const rate = currency.rate;

        if (!output[code]) {
          output[code] = [];
        }

        output[code].push(rate);
      }
    }

    return output;
  }
}

class NBUDataProvider extends DataProvider {
  async getData() {
    const dates = ['20250303', '20250304', '20250305'];
    const data = [];
    for (const day of dates) {
      try {
        const response = await fetch(
          `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${day}&json`
        );
        const dataOnDay = await response.json();
        data.push(dataOnDay);
      } catch (err) {
        console.log('failed to get Data in DataProvider: ', err);
      }
    }
    return { data, dates };
  }
}

module.exports = { NBUDataProvider, NBUDataProcessor, Server };
