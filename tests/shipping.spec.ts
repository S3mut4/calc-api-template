import { test, expect } from "@playwright/test";
import { calculateShipping } from "../helpers/helpers";
import { shippingCases } from "../test-data/shipping.data";

for (const {
  id,
  category,
  description,
  params,
  status,
  expected,
} of shippingCases) {
  test(`${id} [${category}] ${description}`, async ({ request }) => {
    const response = await calculateShipping(request, params);

    expect(response.status()).toBe(status);
    expect(await response.json()).toEqual(expected);
  });
}

test("01_26 [URL] unknown URL returns 404", async ({ request }) => {
  const response = await request.get("/api/shipping/unknown");

  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ error: expect.any(String) });
});

test("01_27 [Method] POST returns 405", async ({ request }) => {
  const response = await request.post("/api/shipping/calculate", {
    params: { country: "EE", weightKg: 1 },
  });

  expect(response.status()).toBe(405);
  expect(await response.json()).toEqual({ error: expect.any(String) });
});
