import { api, APIResponse } from "./api";
import { createSession as dbCreateSession } from "../db/session";
import CustomException from "../error";

export async function createSession(signingKey: string): Promise<APIResponse> {
  const data = await api.post("/session/create", {
    signing_key: signingKey,
  });
  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  const result = data.data as APIResponse;

  dbCreateSession(result.data?.session_id, result.data?.ttl);

  return result;
}
