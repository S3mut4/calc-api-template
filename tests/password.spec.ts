import { test, expect } from "@playwright/test";
import { checkPassword } from "../helpers/helpers";
import { passwordCases } from "../test-data/password.data";

for (const {
  id,
  category,
  description,
  data,
  status,
  expected,
} of passwordCases) {
  test(`${id} [${category}] ${description}`, async ({ request }) => {
    const response = await checkPassword(request, data);

    expect(response.status()).toBe(status);
    expect(await response.json()).toEqual(expected);
  });
}

test("04_18 [Method] GET returns 405", async ({ request }) => {
  const response = await request.get("/api/password/check");

  expect(response.status()).toBe(405);
  expect(await response.json()).toEqual({ error: expect.any(String) });
});
