import { NavigationProp, Route } from "@react-navigation/native";

export interface ScreenProps {
  navigation: NavigationProp<any>;
  route: Route<any>;
}

type CleepType = "text" | "file";

export interface Cleep {
  id: string;
  content: string;
  type: CleepType;
  session_id: string;
  created_at: string;
  updated_at: string;
}

export interface Session {
  session_id: string;
  signing_key: string;
  ttl?: number;
}

export enum WSEvents {
  DISCONNECT = "disconnect",
  DISCONNECTED = "disconnected",
  CONNECT = "connect",
  CONNECTION = "connection",
  ERROR = "error",
  CONNECT_ERROR = "connect_error",
  RECONNECT = "reconnect",
}

export enum SessionEvents {
  CLIENT_JOINED = "client_joined",
  ATTACHED_CUSTOM_ID = "attached_custom_id",
}

export enum CleepEvents {
  CREATED = "new_cleep",
  DELETED = "delete_cleep",
  UPDATED = "update_cleep",
}
