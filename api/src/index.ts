import express from "express";
import fetch from "node-fetch";
// @ts-ignore
import cors from "cors";

const PORT = 3001;
const app = express();

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;
const API_URI = process.env.ALPHAVANTAGE_API_URI;

app.use(cors());

app.use("/api/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  try {
    const apiData = await fetch(
      `${API_URI}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
    );
    const apiJson = await apiData.json();
    res.json(apiJson);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
