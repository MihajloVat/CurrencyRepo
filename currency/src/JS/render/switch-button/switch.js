document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.getElementById('switch-button');
    const plotPage = document.querySelector('.plot-page');
    const calculatorPage = document.querySelector('.calculator-page');

    resetButton.addEventListener('click', () => {

        plotPage.classList.add('hidden');

        calculatorPage.classList.add('active');
    });
});