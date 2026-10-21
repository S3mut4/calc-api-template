import { expect } from "@playwright/test";

const errorBody = { error: expect.any(String) };
const localPart64 = "a".repeat(64);
const address254 = `${localPart64}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(58)}.ee`;
const address255 = `${localPart64}@${"b".repeat(63)}.${"c".repeat(63)}.${"d".repeat(59)}.ee`;

// prettier-ignore
export const emailCases = [
    // Valid
    { id: "05_01", category: "Valid", description: "anna@example.ee", params: { email: "anna@example.ee" }, status: 200, expected: { email: "anna@example.ee", valid: true, reason: null } },

    // Invalid AT
    { id: "05_02", category: "Invalid AT", description: "no @", params: { email: "annaexample.ee" }, status: 200, expected: { email: "annaexample.ee", valid: false, reason: "INVALID_AT" } },

    // Missing domain
    { id: "05_03", category: "Missing domain", description: "nothing after @", params: { email: "anna@" }, status: 200, expected: { email: "anna@", valid: false, reason: "INVALID_DOMAIN" } },
    { id: "05_04", category: "Missing domain", description: "single label", params: { email: "anna@example" }, status: 200, expected: { email: "anna@example", valid: false, reason: "INVALID_DOMAIN" } },

    // Invalid domain
    { id: "05_05", category: "Invalid domain", description: "empty first label", params: { email: "anna@.ee" }, status: 200, expected: { email: "anna@.ee", valid: false, reason: "INVALID_DOMAIN" } },
    { id: "05_06", category: "Invalid domain", description: "two dots in a row", params: { email: "anna@example..ee" }, status: 200, expected: { email: "anna@example..ee", valid: false, reason: "INVALID_DOMAIN" } },

    // Invalid request
    { id: "05_07", category: "Invalid request", description: "empty email", params: { email: "" }, status: 400, expected: errorBody },
    { id: "05_08", category: "Invalid request", description: "missing email parameter", params: {}, status: 400, expected: errorBody },

    // Length
    { id: "05_09", category: "Length", description: "254 chars (max length)", params: { email: address254 }, status: 200, expected: { email: address254, valid: true, reason: null } },
    { id: "05_10", category: "Length", description: "255 chars", params: { email: address255 }, status: 200, expected: { email: address255, valid: false, reason: "TOO_LONG" } },
];