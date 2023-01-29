import { api, APIResponse } from "./api";
import { createSession as dbCreateSession } from "../db/session";
import CustomException from "../error";

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

  dbCreateSession(result.data?.session_id, result.data?.ttl);

  return result;
}
