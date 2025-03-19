const fs = require('fs');
const path = require('path');

async function DataFetch() {
  try {
    const responses = await Promise.all([
      fetch(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'
      ),
      fetch(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20250318&json'
      ),
      fetch(
        'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=20250317&json'
      ),
    ]);
    const data = await Promise.all(responses.map((res) => res.json()));

    return data;
  } catch (err) {
    console.log('error while fetching:', err);
  }
}
