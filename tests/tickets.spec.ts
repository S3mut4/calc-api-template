import { test, expect } from "@playwright/test";
import { getTicketPrice } from "../helpers/helpers";
import { ticketCases } from "../test-data/tickets.data";

for (const {
  id,
  category,
  description,
  params,
  status,
  expected,
} of ticketCases) {
  test(`${id} [${category}] ${description}`, async ({ request }) => {
    const response = await getTicketPrice(request, params);

    expect(response.status()).toBe(status);
    expect(await response.json()).toEqual(expected);
  });
}
