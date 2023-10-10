# Currency Conversion API

Currency Conversion is a free and open-source API designed to provide real-time currency conversion rates between various currencies. It allows clients to submit conversion requests and receive accurate conversion results.

`currency-conversion-api-tool.vercel.app` hosts a public instance of the API.

## Getting Started

Get supported currencies

```
https://currency-conversion-api-tool.vercel.app/currencies
```

Get a specific currency

```
https://currency-conversion-api-tool.vercel.app/currencies/USD
```

Get real time rates based in one currency

```
https://currency-conversion-api-tool.vercel.app/real-time-rates/USD
```

Get real time rates (default currency EUR)

```
https://currency-conversion-api-tool.vercel.app/real-time-rates
```

(POST) Convert an amount from one currency to another

```
https://currency-conversion-api-tool.vercel.app/convert?baseCurrency=USD&targetCurrency=EUR&amount=1000
```

(POST) Multiple currency conversion requests in a single batch. The body of the request should be a JSON array containing individual conversion requests

```
https://currency-conversion-api-tool.vercel.app/convert-batch
```

Body:
```
[
    {
        "baseCurrency": "USD",
        "targetCurrency": "EUR",
        "amount": 1.11
    },
    {
        "baseCurrency": "EUR",
        "targetCurrency": "GBP",
        "amount": 50
    },
    // Add more conversion requests as needed
]
```