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

  return session.rows._array[0];
}

export function getSessions(): Session[] {
  const sessions = db.execute(
    `SELECT * FROM sessions ORDER BY created_at DESC`
  );

  return sessions.rows._array;
}