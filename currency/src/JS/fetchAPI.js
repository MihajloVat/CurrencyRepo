fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
  .then((res) => res.json())
  .then((data) => console.log(data));
