import { ApisauceInstance, create } from "apisauce";

export interface APIResponse {
  message: string;
  success: boolean;
  code: number;
  data: any;
  meta: any;
}

export interface SessionCheckResult {
  session_id: string;
  active_connections: number;
  ttl: number;
  original_ttl: number;
  created_at: string;
}

export const API_URL = "https://api.cleep.app/api/v1";
export const API_HOST = "api.cleep.app";
export const WEB_URL = "www.cleep.app";

export const api = create({
  baseURL: API_URL,
});

export function initRequestsWithHeaders(
  sessionID: string,
  signingKey: string
): ApisauceInstance {
  return create({
    baseURL: API_URL,
    headers: {
      "X-Session-ID": sessionID,
      "X-Signing-Key": signingKey,
    },
  });
}
