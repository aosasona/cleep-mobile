import { io, Socket } from "socket.io-client";
import { isAndroid } from "../platform";
import { API_HOST, API_URL } from "../requests/api";

interface SocketInitData {
  session_id: string;
  signing_key: string;
  reconnection_count: number;
}

export function initSocket(data: SocketInitData): Socket {
  return io(`ws://${API_HOST}`, {
    autoConnect: true,
    transports: isAndroid ? ["websocket"] : ["polling"],
    reconnectionAttempts: data?.reconnection_count || 3,
    query: {
      session_id: data.session_id,
      signing_key: data.signing_key,
    },
  });
}
