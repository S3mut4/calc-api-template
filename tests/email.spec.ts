import { test, expect } from "@playwright/test";
import { checkEmail } from "../helpers/helpers";
import { emailCases } from "../test-data/email.data";

for (const {
  id,
  category,
  description,
  params,
  status,
  expected,
} of emailCases) {
  test(`${id} [${category}] ${description}`, async ({ request }) => {
    const response = await checkEmail(request, params);

    expect(response.status()).toBe(status);
    expect(await response.json()).toEqual(expected);
  });
}

test("05_11 [Method] POST returns 405", async ({ request }) => {
  const response = await request.post("/api/email/check", {
    params: { email: "anna@example.ee" },
  });

  expect(response.status()).toBe(405);
  expect(await response.json()).toEqual({ error: expect.any(String) });
});
