const updater = window.api.updater;
const fileReader = window.api.fileReader;
const TICK_NUMBER = 5;
const PADDING_RATIO = 0.5;

document.getElementById('tst').addEventListener('click', async () => {
  let data = null;

  try {
    const fileContent = await fileReader.readFile();
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(error);
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
