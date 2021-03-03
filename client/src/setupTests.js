// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import fetchMock from "fetch-mock";

const envVars = process.env;

beforeAll(() => {
  process.env.REACT_APP_API_URI = "http://localhost:4000/api";
});

afterAll(() => {
  process.env = envVars;
});

afterEach(() => {
  fetchMock.restore();
});
