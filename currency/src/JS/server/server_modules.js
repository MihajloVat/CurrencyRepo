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
  constructor(url) {
    this.url = url;
  }
  async getData() {
    try {
      const response = await fetch(this.url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('failed to get Data in DataProvider: ', err);
    }
  }
}

class DataProcessor {
  process(rawData) {
    throw new Error('Method not implemented');
  }
}

class NBUDataProcessor extends DataProcessor {
  process(rawData) {
    const output = {
      dates: rawData.map((item) => item.exchangedate),
      rates: rawData.map((item) => item.rate),
    };

    return output;
  }
}

module.exports = { DataProvider, NBUDataProcessor, Server };
