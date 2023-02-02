import { db, Session } from "./database";

export function createSession(sessionId: string, duration: number) {
  const dur = duration * 24;
  db.execute(`INSERT INTO sessions (session_id, duration) VALUES (?, ?);`, [
    sessionId,
    dur,
  ]);
}

export function getSessionByID(id: number): Session {
  const session = db.execute(`SELECT * FROM sessions WHERE id = ?`, [id]);

  return session?.rows?._array[0] || null;
}

export function getSessionBySessionID(session_id: string): Session | null {
  const session = db.execute(`SELECT * FROM sessions WHERE session_id = ?`, [
    session_id,
  ]);

  return session?.rows?._array[0] || null;
}

export function getSessions(): Session[] {
  const sessions = db.execute(
    `SELECT * FROM sessions ORDER BY created_at DESC`
  );

  return sessions.rows._array;
}

export function deleteSession(id: number) {
  db.execute(`DELETE  FROM sessions WHERE id = ?`, [id]);
}

export function batchDeleteSessions(ids: number[], data: Session[]) {
  for (const idx of ids) {
    const id = data[idx].id;
    deleteSession(id);
  }
}
