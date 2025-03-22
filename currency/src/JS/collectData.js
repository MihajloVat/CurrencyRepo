async function getPlotData(curr) {
  try {
    const response = await fetch(
      `https://bank.gov.ua/NBU_Exchange/exchange_site?start=20230101&end=20231231&valcode=${curr}&sort=exchangedate&order=desc&json`
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.log('error while fetching:', err);
  }
}

module.exports = getPlotData;

//getPlotData('usd').then((data) => console.log(data)); //debug
