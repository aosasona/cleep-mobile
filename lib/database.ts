import { open } from "react-native-quick-sqlite";

const db = open({ name: "app.sqlite" });

export function migrate() {
  db.execute(`CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    session_id TEXT NOT NULL,
    duration INTEGER NOT NULL DEFAULT 24,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT session_idx UNIQUE (session_id)
  );`);
}
