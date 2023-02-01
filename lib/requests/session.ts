import { api, APIResponse, SessionCheckResult } from "./api";
import { createSession as dbCreateSession } from "../db/session";
import CustomException from "../error";
import { getPassSSKey } from "../storage/keys";
import * as SecureStore from "expo-secure-store";

export async function createSession(
  signingKey: string,
  rawTTL: number
): Promise<APIResponse> {
  const ttl = rawTTL * 24;
  const data = await api.post("/session/create", {
    signing_key: signingKey,
    ttl,
  });
  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  const result = data.data as APIResponse;
  if (!result?.data?.session_id) {
    throw new CustomException("Something went wrong!");
  }

  const secureSessionKey = getPassSSKey(result?.data?.session_id);
  await SecureStore.setItemAsync(secureSessionKey, signingKey);

  dbCreateSession(result.data?.session_id, result.data?.ttl);

  return result;
}

export async function checkSession(
  sessionID: string,
  signingKey: string
): Promise<SessionCheckResult | null> {
  const data = await api.post("/session/check", {
    session_id: sessionID,
    signing_key: signingKey,
  });

  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  const result = data.data as APIResponse;

  return (result?.data as SessionCheckResult) || null;
}
