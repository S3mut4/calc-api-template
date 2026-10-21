import { expect } from "@playwright/test";

const errorBody = { error: expect.any(String) };

// prettier-ignore
export const shippingCases = [
    // Zone EE: weight boundaries
    { id: "01_01", category: "Zone EE", description: "1 kg", params: { country: "EE", weightKg: 1 }, status: 200, expected: { cost: 3, currency: "EUR", days: 2 } },
    { id: "01_02", category: "Zone EE", description: "1.01 kg", params: { country: "EE", weightKg: 1.01 }, status: 200, expected: { cost: 5, currency: "EUR", days: 2 } },
    { id: "01_03", category: "Zone EE", description: "5 kg", params: { country: "EE", weightKg: 5 }, status: 200, expected: { cost: 5, currency: "EUR", days: 2 } },
    { id: "01_04", category: "Zone EE", description: "5.01 kg", params: { country: "EE", weightKg: 5.01 }, status: 200, expected: { cost: 9, currency: "EUR", days: 2 } },
    { id: "01_05", category: "Zone EE", description: "20 kg", params: { country: "EE", weightKg: 20 }, status: 200, expected: { cost: 9, currency: "EUR", days: 2 } },

    // Zone EU: weight boundaries
    { id: "01_06", category: "Zone EU", description: "LV 1 kg", params: { country: "LV", weightKg: 1 }, status: 200, expected: { cost: 6, currency: "EUR", days: 5 } },
    { id: "01_07", category: "Zone EU", description: "LV 1.01 kg", params: { country: "LV", weightKg: 1.01 }, status: 200, expected: { cost: 10, currency: "EUR", days: 5 } },
    { id: "01_08", category: "Zone EU", description: "LV 5 kg", params: { country: "LV", weightKg: 5 }, status: 200, expected: { cost: 10, currency: "EUR", days: 5 } },
    { id: "01_09", category: "Zone EU", description: "LV 5.01 kg", params: { country: "LV", weightKg: 5.01 }, status: 200, expected: { cost: 18, currency: "EUR", days: 5 } },
    { id: "01_10", category: "Zone EU", description: "LV 20 kg", params: { country: "LV", weightKg: 20 }, status: 200, expected: { cost: 18, currency: "EUR", days: 5 } },

    // Zone rest of world: weight boundaries
    { id: "01_11", category: "Zone World", description: "US 1 kg", params: { country: "US", weightKg: 1 }, status: 200, expected: { cost: 12, currency: "EUR", days: 10 } },
    { id: "01_12", category: "Zone World", description: "US 1.01 kg", params: { country: "US", weightKg: 1.01 }, status: 200, expected: { cost: 20, currency: "EUR", days: 10 } },
    { id: "01_13", category: "Zone World", description: "US 5 kg", params: { country: "US", weightKg: 5 }, status: 200, expected: { cost: 20, currency: "EUR", days: 10 } },
    { id: "01_14", category: "Zone World", description: "US 5.01 kg", params: { country: "US", weightKg: 5.01 }, status: 200, expected: { cost: 35, currency: "EUR", days: 10 } },
    { id: "01_15", category: "Zone World", description: "US 20 kg", params: { country: "US", weightKg: 20 }, status: 200, expected: { cost: 35, currency: "EUR", days: 10 } },

    // Express: cost x1.5, fewer days
    { id: "01_16", category: "Express", description: "EE 2.5 kg", params: { country: "EE", weightKg: 2.5, express: true }, status: 200, expected: { cost: 7.5, currency: "EUR", days: 1 } },
    { id: "01_17", category: "Express", description: "DE 2.5 kg", params: { country: "DE", weightKg: 2.5, express: true }, status: 200, expected: { cost: 15, currency: "EUR", days: 2 } },
    { id: "01_18", category: "Express", description: "US 20 kg", params: { country: "US", weightKg: 20, express: true }, status: 200, expected: { cost: 52.5, currency: "EUR", days: 4 } },

    // Invalid params
    { id: "01_19", category: "Invalid", description: "country lowercase ee", params: { country: "ee", weightKg: 1 }, status: 400, expected: errorBody },
    { id: "01_20", category: "Invalid", description: "country XX", params: { country: "XX", weightKg: 1 }, status: 400, expected: errorBody },
    { id: "01_21", category: "Invalid", description: "weight 0", params: { country: "EE", weightKg: 0 }, status: 400, expected: errorBody },
    { id: "01_22", category: "Invalid", description: "weight -1", params: { country: "EE", weightKg: -1 }, status: 400, expected: errorBody },
    { id: "01_23", category: "Invalid", description: "weight 20.01", params: { country: "EE", weightKg: 20.01 }, status: 400, expected: errorBody },
    { id: "01_24", category: "Invalid", description: "weight abc", params: { country: "EE", weightKg: "abc" }, status: 400, expected: errorBody },
    { id: "01_25", category: "Invalid", description: "express yes", params: { country: "EE", weightKg: 1, express: "yes" }, status: 400, expected: errorBody },
];