import { io } from "socket.io-client";

export function createSessionSocket() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const socketServerUrl = apiUrl ? new URL(apiUrl, window.location.origin).origin : window.location.origin;

  return io(socketServerUrl, {
    withCredentials: true,
    transports: ["websocket", "polling"],
  });
}
