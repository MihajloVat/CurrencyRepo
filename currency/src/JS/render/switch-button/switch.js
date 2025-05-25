const switchButton = document.getElementById('switch-button');
const switchButton2 = document.getElementById('switch-button2');
const plotPage = document.querySelector('.plot-page');
const calculatorPage = document.querySelector('.calculator-page');

switchButton.addEventListener('click', () => {
    plotPage.classList.add('hidden');
    plotPage.classList.remove('active');
    calculatorPage.classList.remove('hidden');
    calculatorPage.classList.add('active');
});

switchButton2.addEventListener('click', () => {

    calculatorPage.classList.add('hidden');
    calculatorPage.classList.remove('active');

    plotPage.classList.remove('hidden');
    plotPage.classList.add('active');
});


