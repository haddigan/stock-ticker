import { formatSearchResults } from "./formatSearchResults";

const input = [
  {
    "1. symbol": "AMC",
    "2. name": "AMC Entertainment Holdings Inc - Class A",
    "3. type": "Equity",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-05",
    "8. currency": "USD",
    "9. matchScore": "1.0000",
  },
  {
    "1. symbol": "AMCA",
    "2. name": "iShares Russell 1000 Pure U.S. Revenue ETF",
    "3. type": "ETF",
    "4. region": "United States",
    "5. marketOpen": "09:30",
    "6. marketClose": "16:00",
    "7. timezone": "UTC-05",
    "8. currency": "USD",
    "9. matchScore": "0.8571",
  },
];

const output = [
  { symbol: "AMC", name: "AMC Entertainment Holdings Inc - Class A" },
  {
    symbol: "AMCA",
    name: "iShares Russell 1000 Pure U.S. Revenue ETF",
  },
];

it("Returns a formatted list", () => {
  const result = formatSearchResults(input);
  expect(JSON.stringify(result)).toMatch(JSON.stringify(output));
});
