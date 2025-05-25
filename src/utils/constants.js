import io from "socket.io-client";

export const BASE_URL =
  window.location.hostname === "localhost" ? "http://localhost:7777" : "/api";

  export const createSocketConnection = () => {
    return io(BASE_URL);
  }