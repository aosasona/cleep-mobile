import { open } from "react-native-quick-sqlite";

export interface Session {
  id: number;
  session_id: string;
  duration: number;
  created_at: string;
}

export const db = open({ name: "app.sqlite" });

export function migrate() {
  db.execute(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    session_id TEXT NOT NULL,
    duration INTEGER NOT NULL DEFAULT 24,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT session_idx UNIQUE (session_id)
  );`);
}

export function createSession(sessionId: string, duration: number) {
  db.execute(`INSERT INTO sessions (session_id, duration) VALUES (?, ?);`, [
    sessionId,
    duration,
  ]);
}

export function getSessions(): Session[] {
  const sessions = db.execute(`SELECT * FROM sessions`);

  return sessions.rows._array;
}
