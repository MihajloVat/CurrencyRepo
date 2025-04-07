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

  const updatedLayout = updater.getLayoutUpd(
    data.EUR,
    TICK_NUMBER,
    PADDING_RATIO
  );

  console.log(data);

  Plotly.update('plot', { x: data.dates, y: [data.EUR] }, updatedLayout);
});
