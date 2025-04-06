const input = document.getElementById('currency-input');
const suggestionsBox = document.getElementById('suggestions');
let suggestions = [];

function setSuggestions(newSuggestions) {
  suggestions = newSuggestions;
}

input.addEventListener('input', () => {
  const value = input.value.toLowerCase();
  suggestionsBox.innerHTML = '';

  if (value === '') {
    suggestionsBox.style.display = 'none';
    return;
  }

  const filtered = suggestions.filter((s) => s.toLowerCase().includes(value));

  if (filtered.length === 0) {
    suggestionsBox.style.display = 'none';
    return;
  }

  filtered.forEach((s) => {
    const div = document.createElement('div');
    div.classList.add('suggestion');
    div.textContent = s;
    div.addEventListener('click', () => {
      input.value = s;
      suggestionsBox.style.display = 'none';
      updateStats(s);
    });
    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = 'block';
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.input-container')) {
    suggestionsBox.style.display = 'none';
  }
});

function updateStats(currency) {
  document.getElementById('avg-value').textContent = (
    Math.random() * 20
  ).toFixed(2);
  document.getElementById('min-value').textContent = (
    Math.random() * 10
  ).toFixed(2);
  document.getElementById('max-value').textContent = (
    Math.random() * 30
  ).toFixed(2);
  document.getElementById('count-value').textContent = Math.floor(
    Math.random() * 100
  );
}

// Приклад підказок
setSuggestions(['USD', 'EUR', 'GBP', 'JPY', 'UAH']);
