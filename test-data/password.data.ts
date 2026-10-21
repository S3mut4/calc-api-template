import { expect } from "@playwright/test";
import { PasswordBody } from "../helpers/helpers";

const errorBody = { error: expect.any(String) };

// prettier-ignore
export const passwordCases = [
    // Valid
    { id: "04_01", category: "Valid", description: "meets all rules (8 chars, min length)", data: { password: "Abcdef1!" }, status: 200, expected: { valid: true, errors: [] } },
    { id: "04_02", category: "Valid", description: "64 chars (max length)", data: { password: "Aa1!" + "a".repeat(60) }, status: 200, expected: { valid: true, errors: [] } },

    // One broken rule
    { id: "04_03", category: "One rule", description: "no uppercase", data: { password: "abcdefg1!" }, status: 200, expected: { valid: false, errors: ["NO_UPPERCASE"] } },
    { id: "04_04", category: "One rule", description: "no lowercase", data: { password: "ABCDEFG1!" }, status: 200, expected: { valid: false, errors: ["NO_LOWERCASE"] } },
    { id: "04_05", category: "One rule", description: "no digit", data: { password: "Abcdefgh!" }, status: 200, expected: { valid: false, errors: ["NO_DIGIT"] } },
    { id: "04_06", category: "One rule", description: "no special", data: { password: "Abcdefg12" }, status: 200, expected: { valid: false, errors: ["NO_SPECIAL"] } },
    { id: "04_07", category: "One rule", description: "contains space", data: { password: "Abc def1!" }, status: 200, expected: { valid: false, errors: ["HAS_SPACE"] } },
    { id: "04_08", category: "One rule", description: "contains tab", data: { password: "Abc\tdef1!" }, status: 200, expected: { valid: false, errors: ["HAS_SPACE"] } },

    // Length boundaries
    { id: "04_09", category: "Length", description: "7 chars", data: { password: "Abcde1!" }, status: 200, expected: { valid: false, errors: ["TOO_SHORT"] } },
    { id: "04_10", category: "Length", description: "65 chars", data: { password: "Aa1!" + "a".repeat(61) }, status: 200, expected: { valid: false, errors: ["TOO_LONG"] } },

    // Several broken rules (order of codes)
    { id: "04_11", category: "Several rules", description: "abc", data: { password: "abc" }, status: 200, expected: { valid: false, errors: ["TOO_SHORT", "NO_UPPERCASE", "NO_DIGIT", "NO_SPECIAL"] } },

    // Invalid request (deliberately wrong types)
    { id: "04_12", category: "Invalid request", description: "empty password", data: { password: "" }, status: 400, expected: errorBody },
    { id: "04_13", category: "Invalid request", description: "password is a number", data: { password: 5 } as unknown as PasswordBody, status: 400, expected: errorBody },
    { id: "04_14", category: "Invalid request", description: "password is null", data: { password: null } as unknown as PasswordBody, status: 400, expected: errorBody },
    { id: "04_15", category: "Invalid request", description: "missing password", data: {} as unknown as PasswordBody, status: 400, expected: errorBody },
    { id: "04_16", category: "Invalid request", description: "invalid JSON", data: Buffer.from('{"password": ') as unknown as PasswordBody, status: 400, expected: errorBody },

    // Body size
    { id: "04_17", category: "Body size", description: "body larger than 10000 bytes", data: { password: "a".repeat(10000) }, status: 413, expected: errorBody },
];