const config = {
  PORT: 3001,
  HOSTNAME: 'localhost',
};

const startDay = '20250101';
const lastDay = '20250322';
const currency = 'USD';

const apiUrl = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${startDay}&end=${lastDay}&valcode=${currency}&sort=exchangedate&order=desc&json`;

module.exports = { config, apiUrl };
