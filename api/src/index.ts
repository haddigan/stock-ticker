import express from "express";
import cors from "cors";

import {
  SYMBOL_SEARCH,
  GLOBAL_QUOTE,
  OVERVIEW,
  GLOBAL_QUOTE_KEY,
} from "./app/constants";
import { makeApiRequest } from "./app/makeApiRequest";
import { formatSearchResults } from "./app/formatSearchResults";
import { formatQuoteResults } from "./app/formatQuoteResults";
import { formatOverviewResults } from "./app/formatOverviewResults";

const PORT = process.env.PORT || 3000;
const app = express();
const router = express.Router();

app.use(cors());

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
router.get("/search/:term", async (req, res) => {
  const term = req.params.term;
  try {
    const rawResponse = await makeApiRequest(SYMBOL_SEARCH, term);
    const formattedResponse = formatSearchResults(rawResponse.bestMatches);
    res.json(formattedResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
router.get("/overview/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await makeApiRequest(OVERVIEW, symbol);
    const formattedResponse = formatOverviewResults(response);
    res.json(formattedResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
router.get("/quote/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const rawResponse = await makeApiRequest(GLOBAL_QUOTE, symbol);
    const formattedResponse = formatQuoteResults(rawResponse[GLOBAL_QUOTE_KEY]);
    res.json(formattedResponse);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
