const swapButton = document.getElementById('swap-button');

swapButton.addEventListener('click', async () => {
    const upperCode = inputCodeFrom.value

    inputCodeFrom.value = inputCodeTo.value
    inputCodeTo.value = upperCode

    inputAmountFrom.dispatchEvent(new Event('input'));
})