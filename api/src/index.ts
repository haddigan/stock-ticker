import express from "express";
import cors from "cors";

import { SYMBOL_SEARCH, GLOBAL_QUOTE, OVERVIEW } from "./app/constants";
import { makeApiRequest } from "./app/makeApiRequest";

const PORT = 3001;
const app = express();
const router = express.Router();

app.use(cors());

// https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
router.get("/search/:term", async (req, res) => {
  const term = req.params.term;
  try {
    const response = await makeApiRequest(SYMBOL_SEARCH, term);
    res.json(response);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo
router.get("/overview/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await makeApiRequest(OVERVIEW, symbol);
    res.json(response);
  } catch (err) {
    res.json({ error: err.message });
  }
});

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
router.get("/quote/:symbol", async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const response = await makeApiRequest(GLOBAL_QUOTE, symbol);
    res.json(response);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
