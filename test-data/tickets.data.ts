import { expect } from "@playwright/test";

const errorBody = { error: expect.any(String) };

// prettier-ignore
export const ticketCases = [
    // Age boundaries (weekday)
    { id: "02_01", category: "Age boundary", description: "age 0, MON", params: { age: 0, day: "MON" }, status: 200, expected: { category: "FREE", price: 0 } },
    { id: "02_02", category: "Age boundary", description: "age 6, MON", params: { age: 6, day: "MON" }, status: 200, expected: { category: "FREE", price: 0 } },
    { id: "02_03", category: "Age boundary", description: "age 7, MON", params: { age: 7, day: "MON" }, status: 200, expected: { category: "CHILD", price: 5 } },
    { id: "02_04", category: "Age boundary", description: "age 17, MON", params: { age: 17, day: "MON" }, status: 200, expected: { category: "CHILD", price: 5 } },
    { id: "02_05", category: "Age boundary", description: "age 18, MON", params: { age: 18, day: "MON" }, status: 200, expected: { category: "ADULT", price: 10 } },
    { id: "02_06", category: "Age boundary", description: "age 64, MON", params: { age: 64, day: "MON" }, status: 200, expected: { category: "ADULT", price: 10 } },
    { id: "02_07", category: "Age boundary", description: "age 65, MON", params: { age: 65, day: "MON" }, status: 200, expected: { category: "SENIOR", price: 7 } },
    { id: "02_08", category: "Age boundary", description: "age 120, MON", params: { age: 120, day: "MON" }, status: 200, expected: { category: "SENIOR", price: 7 } },

    // Day: weekday vs weekend price
    { id: "02_09", category: "Day", description: "age 7, FRI", params: { age: 7, day: "FRI" }, status: 200, expected: { category: "CHILD", price: 5 } },
    { id: "02_10", category: "Day", description: "age 17, SAT", params: { age: 17, day: "SAT" }, status: 200, expected: { category: "CHILD", price: 7 } },
    { id: "02_11", category: "Day", description: "age 30, SUN", params: { age: 30, day: "SUN" }, status: 200, expected: { category: "ADULT", price: 12 } },
    { id: "02_12", category: "Day", description: "age 65, WED", params: { age: 65, day: "WED" }, status: 200, expected: { category: "SENIOR", price: 7 } },

    // Invalid params
    { id: "02_13", category: "Invalid", description: "age -1", params: { age: -1, day: "MON" }, status: 400, expected: errorBody },
    { id: "02_14", category: "Invalid", description: "age 121", params: { age: 121, day: "MON" }, status: 400, expected: errorBody },
    { id: "02_15", category: "Invalid", description: "age 1.5", params: { age: 1.5, day: "MON" }, status: 400, expected: errorBody },
    { id: "02_16", category: "Invalid", description: "age abc", params: { age: "abc", day: "MON" }, status: 400, expected: errorBody },
    { id: "02_17", category: "Invalid", description: "day lowercase mon", params: { age: 30, day: "mon" }, status: 400, expected: errorBody },
    { id: "02_18", category: "Invalid", description: "day XXX", params: { age: 30, day: "XXX" }, status: 400, expected: errorBody },
    { id: "02_19", category: "Invalid", description: "missing age", params: { day: "MON" }, status: 400, expected: errorBody },
    { id: "02_20", category: "Invalid", description: "missing day", params: { age: 30 }, status: 400, expected: errorBody },

// TODO: candidate bug cases (not in the script yet).
// A naive integer check like Number(age) + Number.isInteger() accepts:
//   age=     -> Number("") is 0, treated as age 0 (spec requires 400)
//   age=1e1  -> parsed as 10
//   age=0x11 -> parsed as 17
// Spec is ambiguous on "17.0" and "007" (integer value, non-integer text).

];