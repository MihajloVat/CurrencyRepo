const lochostURL = window.api.getURL();
const updater = window.api.updater;
const TICK_NUMBER = 5;
const PADDING_RATIO = 0.5;

document.getElementById('tst').addEventListener('click', async () => {
  let data = null;

  try {
    const response = await fetch(lochostURL);
    data = await response.json();
  } catch (error) {
    console.error('Помилка отримання даних:', error);
  }

  const formattedDates = data.dates.map((str) => {
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const day = str.slice(6, 8);
    return `${year}-${month}-${day}`;
  });

  const updatedLayout = updater.getLayoutUpd(
    data.EUR,
    TICK_NUMBER,
    PADDING_RATIO
  );

  Plotly.update('plot', { x: [formattedDates], y: [data.EUR] }, updatedLayout);
});
