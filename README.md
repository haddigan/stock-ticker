# Stock Ticker

Search for stock tickers and compare up to three at once.

https://haddigan.github.io/stock-ticker/

## Usage

Search for stock tickers by company name or by symbol using the search bar. Select up to three companies to compare stock information.

## Run locally

NPM:

```sh
npm i
npm start
```

Yarn:

```sh
yarn
yarn start
```

This will run the client and server apps in parallel. Note that there are required environmental variables that need to be set. See `.env.sample` for details. An alphavantage API key is required to run locally, you can get one here: https://www.alphavantage.co/support/#support

## API Rate Limit

Unfortunately the API only allows 5 requests per minute. When the API hits the rate limit it will start returning 500 errors until the window resets.
