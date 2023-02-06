import CustomException from "../error";
import { Cleep, Session } from "../types";
import { APIResponse, initRequestsWithHeaders } from "./api";

export async function createTextCleep(
  session: Session,
  content: string
): Promise<Cleep> {
  if (!session) throw new CustomException("Session not provided!");
  if (!content) return;

  const req = initRequestsWithHeaders(session.session_id, session.signing_key);

  const data = await req.post("/cleeps", {
    content,
  });

  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  return (data?.data as APIResponse)?.data as Cleep;
}

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

export async function updateTextCleep(
  session: Session,
  cleepId: string,
  content: string
) {
  if (!session) throw new CustomException("Session not provided!");
  if (!content) return;

  const req = initRequestsWithHeaders(session.session_id, session.signing_key);

  const data = await req.patch(`/cleeps/${cleepId}`, {
    content,
  });

  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  return;
}

export async function deleteCleep(session: Session, cleepId: string) {
  if (!session) throw new CustomException("Session not provided!");
  if (!cleepId) return;

  const req = initRequestsWithHeaders(session.session_id, session.signing_key);

  const data = await req.delete(`/cleeps/${cleepId}`);

  if (!data.ok) {
    throw new CustomException((data?.data as APIResponse)?.message);
  }

  return;
}
