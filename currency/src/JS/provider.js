class DataProvider {
  async getData(startDay, lastDay, currency) {
    const url = `https://bank.gov.ua/NBU_Exchange/exchange_site?start=${startDay}&end=${lastDay}&valcode=${currency}&sort=exchangedate&order=desc&json`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      console.log('failed to get Data in DataProvider: ', err);
    }
  }
}

module.exports = DataProvider;
