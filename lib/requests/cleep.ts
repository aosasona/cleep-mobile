import CustomException from "../error";
import { Cleep } from "../types";
import { APIResponse, initRequestsWithHeaders } from "./api";

export async function getCleeps(
  sessionID: string,
  signingKey: string
): Promise<Cleep[]> {
  if (!(sessionID && signingKey)) {
    throw new CustomException("Missing required fields!");
  }
  const req = initRequestsWithHeaders(sessionID, signingKey);

  const data = await req.get("/cleeps");
  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  return (data?.data as APIResponse)?.data as Cleep[];
}
