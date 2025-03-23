const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const data = JSON.stringify({ name: 'mike', age: 18 });
  res.end(data);
});

server.listen(PORT, 'localhost', (error) =>
  error ? console.log(error) : console.log('listening')
);
