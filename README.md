# Stock Ticker

Search for stock tickers and compare up to three at once.

https://haddigan.github.io/stock-ticker/

## Usage

Search for stock tickers by company name or by symbol using the search bar. Select up to three companies to compare stock information.

## Run locally

NPM:

```sh
npm i
cp .env.development.local.sample .env.development.local
# Edit .env.development.local to add your API key
npm start
```

Yarn:

```sh
yarn
cp .env.development.local.sample .env.development.local
# Edit .env.development.local to add your API key
yarn start
```

This will run the client and server apps in parallel. Note that there are required environmental variables that need to be set. For local development, you should use one `.env.development.local` file in the project root. In dev mode this will be consumed by both the client and server apps. See `.env.development.local.sample` for details. (Make sure that the `PORT` variable matches the port in the `REACT_APP_API_URI` url).

**An alphavantage API key is required to run locally, and must be included in the environment variables. You can get one here: https://www.alphavantage.co/support/#support**

## API Rate Limit

Unfortunately the API only allows 5 requests per minute. When the API hits the rate limit it will start returning 500 errors until the timeout window resets.
