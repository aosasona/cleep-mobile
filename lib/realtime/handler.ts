import { Dispatch, SetStateAction } from "react";
import { Socket } from "socket.io-client";
import CustomException from "../error";
import CleepMutator from "../mutators/Cleep";
import { getCleeps } from "../requests/cleep";
import { Cleep, CleepEvents, WSEvents } from "../types";

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

  socket.on(WSEvents.CONNECT, async () => {
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

  socket.on(WSEvents.DISCONNECTED, () => {
    toggleConnectionStatus(false);
  });

  socket.on(WSEvents.RECONNECT, () => {
    toggleConnectionStatus(true);
    stopRetrying();
  });

  socket.on(WSEvents.CONNECT_ERROR, (err) => {
    toggleConnectionStatus(false);
    startRetrying();
    setReconnectionCount((prev) => prev + 1);
    if (reconnectionCount >= 3) {
      onError(new CustomException("Failed to connect"));
      setReconnectionCount(0);
    }
  });

  socket.on(CleepEvents.CREATED, (cleep: Cleep) => {
    if (!CleepMutator.find(data, cleep)) {
      setData((prev) => [cleep, ...prev]);
    }
  });

  socket.on(CleepEvents.DELETED, (cleepId: string) => {
    let copiedData = data;
    const cleepIdx = data.findIndex((c) => c.id == cleepId);
    if (cleepIdx < 0) return;
    const newData = copiedData.filter((c) => c.id != cleepId);
    setData([...newData]);
  });

  socket.on(
    CleepEvents.UPDATED,
    ({ id, content }: { id: string; content: string }) => {
      if (!CleepMutator.find(data, { id } as Cleep)) {
        return;
      }

      let copiedData = data;
      const cleepIdx = data.findIndex((c) => c.id == id);
      copiedData[cleepIdx].content = content;
      setData([...copiedData]);
    }
  );
}
