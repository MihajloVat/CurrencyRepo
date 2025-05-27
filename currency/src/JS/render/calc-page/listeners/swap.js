const swapButton = document.getElementById('swap-button');

swapButton.addEventListener('click', async () => {
    const upperVal = inputCodeFrom.value
    const lowerVal = inputCodeTo.value

    inputCodeFrom.value = lowerVal
    inputCodeTo.value = upperVal

    inputAmountFrom.dispatchEvent(new Event('input'));
})