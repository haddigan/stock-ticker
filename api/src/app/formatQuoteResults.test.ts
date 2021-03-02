import { formatQuoteResults } from "./formatQuoteResults";

const input = {
  "01. symbol": "IBM",
  "02. open": "120.3500",
  "03. high": "122.3200",
  "04. low": "119.8649",
  "05. price": "120.7400",
  "06. volume": "5680785",
  "07. latest trading day": "2021-03-01",
  "08. previous close": "118.9300",
  "09. change": "1.8100",
  "10. change percent": "1.5219%",
};
const output = {
  symbol: "IBM",
  openPrice: "$120.3500",
  highPrice: "$122.3200",
  lowPrice: "$119.8649",
  changePercent: "1.5219%",
};

it("Returns formatted object", () => {
  const result = formatQuoteResults(input);
  expect(result).toMatchObject(output);
});
