const http = require('http');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const response = await fetch(
      'https://bank.gov.ua/NBU_Exchange/exchange_site?start=20250320&end=20250322&valcode=USD&sort=exchangedate&order=desc&json'
    );
    const data = await response.json();

    res.end(JSON.stringify(data));
  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'failed' }));
  }
});

server.listen(PORT, 'localhost', (error) =>
  error ? console.log(error) : console.log('listening')
);
