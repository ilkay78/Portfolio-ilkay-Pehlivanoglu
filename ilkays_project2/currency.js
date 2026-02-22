class Currency {
  constructor() {
    this.url =
      "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_cFVxFZ7IkL4xUYRCppZVCjhfp3fr6weEZtpZz4A2&base_currency=";
  }
// https://freecurrencyapi.com/docs/currencies#request-parameters
 async exchange(amount, firstCurrency, secondCurrency) {
   const response =  await fetch(`${this.url}${firstCurrency}`)
    console.log(response);
   const result = await response.json();
  console.log(result);
    const exchangeResult = amount * result.data[secondCurrency];
    console.log(result.data[secondCurrency]);
    return exchangeResult;
}
}

// async exchange(amount, firstCurrency, secondCurrency) {
//   const response = await fetch(`${this.url}${firstCurrency}`);
//   console.log(response);
//   const result = await response.json();
//   console.log(result);
//   const exchangeResult = amount * result.data[secondCurrency];

//   return exchangeResult;