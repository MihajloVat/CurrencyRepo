const http = require('http');

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch(
      'https://bank.gov.ua/NBU_Exchange/exchange_site?start=20250320&end=20250322&valcode=USD&sort=exchangedate&order=desc&json'
    );
    const rawData = await response.json();

    const dates = [];
    const rates = [];

    rawData.forEach((item) => {
      dates.push(item.exchangedate);
      rates.push(item.rate);
    });

    const output = {
      dates,
      rates,
    };

    res.end(JSON.stringify(output));
  } catch {
    res.end(JSON.stringify({ error: 'failed' }));
  }
});

server.listen(PORT, 'localhost', (error) =>
  error ? console.log(error) : console.log('listening')
);
