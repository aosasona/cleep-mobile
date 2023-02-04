import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import CustomException from "../error";
import CleepMutator from "../mutators/Cleep";
import { getCleeps } from "../requests/cleep";
import { Cleep } from "../types";

interface HandlerArgs {
  socket: Socket;
  session: { session_id: string; signing_key: string };
  data: Cleep[];
  setData: Dispatch<SetStateAction<Cleep[]>>;
  hasFetchedOnce: boolean;
  reconnectionCount: number;
  setReconnectionCount: Dispatch<SetStateAction<number>>;
  toggleConnectionStatus: Dispatch<SetStateAction<boolean>>;
  onFetch: () => void;
  onError: (error: Error) => void;
  startRetrying: () => void;
  stopRetrying: () => void;
}

export function handleSocketEvent(args: HandlerArgs) {
  const {
    socket,
    session,
    data,
    setData,
    reconnectionCount,
    setReconnectionCount,
    hasFetchedOnce,
    onFetch,
    onError,
    startRetrying,
    stopRetrying,
    toggleConnectionStatus,
  } = args;

  socket.on("connect", async () => {
    if (!hasFetchedOnce) {
      try {
        const data = await getCleeps(session.session_id, session.signing_key);
        setData(data);
        onFetch();
      } catch (err: any) {
        onError(err);
      } finally {
        toggleConnectionStatus(true);
      }
    }
  });

  socket.on("disconnected", () => {
    toggleConnectionStatus(false);
  });

  socket.on("reconnect", () => {
    toggleConnectionStatus(true);
    stopRetrying();
  });

  socket.on("connect_error", (err) => {
    toggleConnectionStatus(false);
    startRetrying();
    setReconnectionCount((prev) => prev + 1);
    if (reconnectionCount >= 3) {
      onError(new CustomException("Failed to connect"));
      setReconnectionCount(0);
    }
  });

  socket.on("new_cleep", (cleep: Cleep) => {
    if (!CleepMutator.find(data, cleep)) {
      setData((prev) => [cleep, ...prev]);
    }
  });
}
