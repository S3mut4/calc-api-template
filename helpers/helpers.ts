import { APIRequestContext } from '@playwright/test';

export type ShippingParams = {
  country?: string;
  weightKg?: string | number;
  express?: string | boolean;
};

export function calculateShipping(request: APIRequestContext, params: ShippingParams = {}) {
  return request.get("/api/shipping/calculate", { params });
}

export type TicketParams = {
  age?: string | number;
  day?: string;
};

export function getTicketPrice(request: APIRequestContext, params: TicketParams = {}) {
  return request.get("/api/tickets/price", { params });
}

export function calculateTurnoverTax(
  request: APIRequestContext,
  country: string,
  amount: string | number,
) {
  return request.get('/api/turnover-tax/calculate', { params: { country, amount } });
}

export type PasswordBody = { password: string };

export function checkPassword(request: APIRequestContext, data: PasswordBody) {
  return request.post("/api/password/check", {
    data,
    headers: { "Content-Type": "application/json" },
  });
}

export type EmailParams = { email?: string };

export function checkEmail(request: APIRequestContext, params: EmailParams = {}) {
  return request.get("/api/email/check", { params });
}

