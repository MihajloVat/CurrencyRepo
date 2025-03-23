const { spawn } = require('child_process');

// Запускаємо сервер
const server = spawn('node', ['server.js'], {
  stdio: 'inherit',
});

// Після запуску сервера виконуємо fetch
server.on('spawn', () => {
  const datearr = [];
  const ratearr = [];

  // Затримка перед виконанням fetch, щоб дати серверу час на запуск
  setTimeout(() => {
    fetch('http://localhost:3000/data')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Заповнюємо масиви правильними даними
        data.forEach((rate) => {
          datearr.push(rate['exchangedate']);
          ratearr.push(rate['rate']);
        });

        // Логування масивів після заповнення
        console.log(datearr.reverse());
        console.log(ratearr);
      })
      .catch((error) =>
        console.error(
          'There has been a problem with your fetch operation:',
          error
        )
      );
  }, 1000); // 1 секунда затримки
});
