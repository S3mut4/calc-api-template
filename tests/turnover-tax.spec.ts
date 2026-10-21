import { test, expect } from "@playwright/test";
import { calculateTurnoverTax } from "../helpers/helpers";

// Example from the spec
test("turnover tax: EE, 19.99", async ({ request }) => {
  const response = await calculateTurnoverTax(request, "EE", 19.99);

  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({
    net: 19.99,
    tax: 4.8,
    gross: 24.79,
    rate: 24,
  });
});

// Example of parametrization: same test, different data
const SimpleCases = [
  { country: "EE", amount: 100 },
  { country: "LV", amount: 19.99 },
  { country: "LT", amount: 100 },
  { country: "FI", amount: 150 },
  { country: "SE", amount: 200 },
  // Boundary
  { country: "EE", amount: 0.01 },
  { country: "EE", amount: 1000000 },
];

for (const { country, amount } of SimpleCases) {
  test(`turnover tax: ${country}, ${amount}`, async ({ request }) => {
    const response = await calculateTurnoverTax(request, country, amount);

    expect(response.status()).toBe(200);
    expect(await response.json()).toHaveProperty("net", amount);
    //expect(await response.json()).toEqual({ net: amount, tax, gross, rate });
  });
}

// Example of parametrization: same test, different data
const SimpleNegativeCases = [
  // Negative scenario
  { country: "AB", amount: 100 },
  { country: "", amount: 19.99 },
  { country: "LT", amount: 0 },
  { country: "FI", amount: 1000050 },
  { country: "SE", amount: -1 },
];

test.describe("turnover tax: Negative Cases", async () => {
  for (const { country, amount } of SimpleNegativeCases) {
    test(`turnover tax: ${country}, ${amount}`, async ({ request }) => {
      const response = await calculateTurnoverTax(request, country, amount);

      expect(response.status()).toBe(400);
      //expect(await response.json()).toHaveProperty("net", amount);
      //expect(await response.json()).toEqual({ net: amount, tax, gross, rate });
    });
  }
});

// TODO (students): all 5 countries, rounding half-up to cents
test.fixme("turnover tax: rates and rounding", async () => {});

// TODO (students): 400 for unknown country, amount 0 / -5 / 1000000.01 / 10.123 / "abc"
test.fixme("turnover tax: invalid params return 400", async () => {});
