import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const PORT = 3001;
const app = express();

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;
const API_URI = process.env.ALPHAVANTAGE_API_URI;

app.use(cors());

app.get("/api/search/:term", async (req, res) => {
  // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=BA&apikey=demo
  const term = req.params.term;
  const endpoint = `${API_URI}?function=SYMBOL_SEARCH&keywords=${term}&apikey=${API_KEY}`;

  try {
    const apiData = await fetch(endpoint);
    const apiJson = await apiData.json();
    res.json(apiJson);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/api/:symbol", async (req, res) => {
  // https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo
  const symbol = req.params.symbol;
  const endpoint = `${API_URI}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const apiData = await fetch(endpoint);
    const apiJson = await apiData.json();
    res.json(apiJson);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
