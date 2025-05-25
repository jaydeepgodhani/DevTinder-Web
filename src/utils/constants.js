import io from "socket.io-client";

export const BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:7777" : "/api";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") return io(BASE_URL);
  else return io("/", { path: "api.socket.io" });
};
