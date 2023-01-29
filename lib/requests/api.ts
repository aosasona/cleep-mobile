import { create } from "apisauce";

export interface APIResponse {
  message: string;
  success: boolean;
  code: number;
  data: any;
  meta: any;
}

export const API_URL = "https://api.cleep.app/api/v1";
export const API_HOST = "api.cleep.app";

export const api = create({
  baseURL: API_URL,
});
