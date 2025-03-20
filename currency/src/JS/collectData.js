const fs = require('fs');
const path = require('path');

async function DataFetch() {
  try {
    const response = await fetch(
      'https://bank.gov.ua/NBU_Exchange/exchange_site?start=20230101&end=20231231&valcode=USD&sort=exchangedate&order=desc&json'
    );
    const data = response.json();

    return data;
  } catch (err) {
    console.log('error while fetching:', err);
  }
}

DataFetch().then((data) => console.log(data));
