# Calculators API — Parameterized Tests

Playwright API tests for the Calculators API (`https://shop.tl-academy.ee/docs/calculators?lang=en#en-tax`): 
shipping cost, 
ticket price, 
turnover tax, 
password check
email check. 

## Approach

- **One helper per endpoint** (`helpers/helpers.ts`).
- **One data file per endpoint** (`test-data/*.data.ts`).
- **One loop per spec file**.
- **Error bodies** are checked as `{ error: expect.any(String) }`.
- **Cases with a different HTTP method or URL** (404, 405) are left as standalone.

## Project structure

```
helpers/helpers.ts          request helpers
test-data/*.data.ts         test case tables
tests/*.spec.ts             one spec per endpoint
.github/workflows/tests.yml CI: type check + tests + HTML report
```

## Scope

- **V1 (this version):** covers the cases requested in the exercise script (the `TODO (students)` items).
- **V2 (backlog):** remaining cases can be added as new rows in the data files without changing the specs.

---

## 1.1 Shipping — `GET /api/shipping/calculate`

| ID    | Category   | Test case                | Expected result        |
|-------|------------|--------------------------|------------------------|
| 01_01 | Zone EE    | EE, 1 kg                 | 200, cost 3, days 2    |
| 01_02 | Zone EE    | EE, 1.01 kg              | 200, cost 5, days 2    |
| 01_03 | Zone EE    | EE, 5 kg                 | 200, cost 5, days 2    |
| 01_04 | Zone EE    | EE, 5.01 kg              | 200, cost 9, days 2    |
| 01_05 | Zone EE    | EE, 20 kg                | 200, cost 9, days 2    |
| 01_06 | Zone EU    | LV, 1 kg                 | 200, cost 6, days 5    |
| 01_07 | Zone EU    | LV, 1.01 kg              | 200, cost 10, days 5   |
| 01_08 | Zone EU    | LV, 5 kg                 | 200, cost 10, days 5   |
| 01_09 | Zone EU    | LV, 5.01 kg              | 200, cost 18, days 5   |
| 01_10 | Zone EU    | LV, 20 kg                | 200, cost 18, days 5   |
| 01_11 | Zone World | US, 1 kg                 | 200, cost 12, days 10  |
| 01_12 | Zone World | US, 1.01 kg              | 200, cost 20, days 10  |
| 01_13 | Zone World | US, 5 kg                 | 200, cost 20, days 10  |
| 01_14 | Zone World | US, 5.01 kg              | 200, cost 35, days 10  |
| 01_15 | Zone World | US, 20 kg                | 200, cost 35, days 10  |
| 01_16 | Express    | EE, 2.5 kg, express=true | 200, cost 7.5, days 1  |
| 01_17 | Express    | DE, 2.5 kg, express=true | 200, cost 15, days 2   |
| 01_18 | Express    | US, 20 kg, express=true  | 200, cost 52.5, days 4 |
| 01_19 | Invalid    | country=ee               | 400, error             |
| 01_20 | Invalid    | country=XX               | 400, error             |
| 01_21 | Invalid    | weightKg=0               | 400, error             |
| 01_22 | Invalid    | weightKg=-1              | 400, error             |
| 01_23 | Invalid    | weightKg=20.01           | 400, error             |
| 01_24 | Invalid    | weightKg=abc             | 400, error             |
| 01_25 | Invalid    | express=yes              | 400, error             |
| 01_26 | URL        | GET unknown URL          | 404, error             |
| 01_27 | Method     | POST on the endpoint     | 405, error             |

## 1.2 Tickets — `GET /api/tickets/price`

| ID    | Category     | Test case    | Expected result      |
|-------|--------------|--------------|----------------------|
| 02_01 | Age boundary | age 0, MON   | 200, FREE, price 0   |
| 02_02 | Age boundary | age 6, MON   | 200, FREE, price 0   |
| 02_03 | Age boundary | age 7, MON   | 200, CHILD, price 5  |
| 02_04 | Age boundary | age 17, MON  | 200, CHILD, price 5  |
| 02_05 | Age boundary | age 18, MON  | 200, ADULT, price 10 |
| 02_06 | Age boundary | age 64, MON  | 200, ADULT, price 10 |
| 02_07 | Age boundary | age 65, MON  | 200, SENIOR, price 7 |
| 02_08 | Age boundary | age 120, MON | 200, SENIOR, price 7 |
| 02_09 | Day          | age 7, FRI   | 200, CHILD, price 5  |
| 02_10 | Day          | age 17, SAT  | 200, CHILD, price 7  |
| 02_11 | Day          | age 30, SUN  | 200, ADULT, price 12 |
| 02_12 | Day          | age 65, WED  | 200, SENIOR, price 7 |
| 02_13 | Invalid      | age=-1       | 400, error           |
| 02_14 | Invalid      | age=121      | 400, error           |
| 02_15 | Invalid      | age=1.5      | 400, error           |
| 02_16 | Invalid      | age=abc      | 400, error           |
| 02_17 | Invalid      | day=mon      | 400, error           |
| 02_18 | Invalid      | day=XXX      | 400, error           |
| 02_19 | Invalid      | missing age  | 400, error           |
| 02_20 | Invalid      | missing day  | 400, error           |

## 1.4 Password — `POST /api/password/check`

| ID    | Category        | Test case                                | Expected result                                             |
|-------|-----------------|------------------------------------------|-------------------------------------------------------------|
| 04_01 | Valid           | `Abcdef1!` (8 chars, min length)         | 200, valid true, errors []                                  |
| 04_02 | Valid           | `Aa1!` + 60 × `a` (64 chars, max length) | 200, valid true, errors []                                  |
| 04_03 | One rule        | `abcdefg1!`                              | 200, errors [NO_UPPERCASE]                                  |
| 04_04 | One rule        | `ABCDEFG1!`                              | 200, errors [NO_LOWERCASE]                                  |
| 04_05 | One rule        | `Abcdefgh!`                              | 200, errors [NO_DIGIT]                                      |
| 04_06 | One rule        | `Abcdefg12`                              | 200, errors [NO_SPECIAL]                                    |
| 04_07 | One rule        | `Abc def1!` (space)                      | 200, errors [HAS_SPACE]                                     |
| 04_08 | One rule        | `Abc\tdef1!` (tab)                       | 200, errors [HAS_SPACE]                                     |
| 04_09 | Length          | `Abcde1!` (7 chars)                      | 200, errors [TOO_SHORT]                                     |
| 04_10 | Length          | `Aa1!` + 61 × `a` (65 chars)             | 200, errors [TOO_LONG]                                      |
| 04_11 | Several rules   | `abc`                                    | 200, errors [TOO_SHORT, NO_UPPERCASE, NO_DIGIT, NO_SPECIAL] |
| 04_12 | Invalid request | `{"password": ""}`                       | 400, error                                                  |
| 04_13 | Invalid request | `{"password": 5}`                        | 400, error                                                  |
| 04_14 | Invalid request | `{"password": null}`                     | 400, error                                                  |
| 04_15 | Invalid request | `{}`                                     | 400, error                                                  |
| 04_16 | Invalid request | invalid JSON                             | 400, error                                                  |
| 04_17 | Body size       | body larger than 10,000 bytes            | 413, error                                                  |
| 04_18 | Method          | GET on the endpoint                      | 405, error                                                  |

## 1.5 Email — `GET /api/email/check`

| ID    | Category        | Test case                   | Expected result                  |
|-------|-----------------|-----------------------------|----------------------------------|
| 05_01 | Valid           | `anna@example.ee`           | 200, valid true, reason null     |
| 05_02 | Invalid AT      | `annaexample.ee`            | 200, valid false, INVALID_AT     |
| 05_03 | Missing domain  | `anna@`                     | 200, valid false, INVALID_DOMAIN |
| 05_04 | Missing domain  | `anna@example`              | 200, valid false, INVALID_DOMAIN |
| 05_05 | Invalid domain  | `anna@.ee`                  | 200, valid false, INVALID_DOMAIN |
| 05_06 | Invalid domain  | `anna@example..ee`          | 200, valid false, INVALID_DOMAIN |
| 05_07 | Invalid request | `email=` (empty)            | 400, error                       |
| 05_08 | Invalid request | missing email               | 400, error                       |
| 05_09 | Length          | 254 characters (max length) | 200, valid true, reason null     |
| 05_10 | Length          | 255 characters              | 200, valid false, TOO_LONG       |
| 05_11 | Method          | POST on the endpoint        | 405, error                       |

---