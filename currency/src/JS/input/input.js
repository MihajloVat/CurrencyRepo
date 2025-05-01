const input = document.getElementById('currency-input');

const suggestions = [
  "USD", "EUR", "UAH", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "CZK",
  "DKK", "HKD", "HUF", "ILS", "INR", "KRW", "MXN", "NOK", "NZD", "PLN",
  "RON", "SEK", "SGD", "THB", "TRY", "ZAR", "BRL", "IDR", "MYR", "PHP",
  "RUB", "SAR", "TWD", "AED", "ARS", "BDT", "CLP", "COP", "EGP", "ISK",
  "KZT", "LKR", "MAD", "NGN", "PKR", "QAR", "RSD", "VND", "BGN", "HRK",
  "KES", "KWD", "OMR", "PEN", "DZD", "GEL", "JOD", "LBP", "MKD", "MNT",
  "MOP", "NAD", "PAB", "SYP", "TND", "TTD", "UGX", "UYU", "UZS", "XOF",
  "YER", "ZMW", "BAM", "BBD", "BHD", "BMD", "BND", "BOB", "BSD", "BTN",
  "BYN", "CDF", "CVE", "DJF", "ETB", "FJD", "GHS", "GNF", "GTQ", "HNL"
];

const awesomplete = new Awesomplete(input, {
  list: suggestions,
  maxItems: 1000,
  minChars: 0
});

input.addEventListener('focus', () => {
  awesomplete.evaluate();
});
