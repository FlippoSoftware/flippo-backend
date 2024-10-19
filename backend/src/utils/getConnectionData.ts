import { type TConnectionData } from "@schemas/index.ts";
import { type Request } from "express";

export default (req: Request) => {
  const userAgent = req.useragent;
  const connectionData = {
    ip: req.socket.remoteAddress,
    browser: userAgent ? userAgent.browser : "",
    system: userAgent ? userAgent.os : ""
  } as Omit<TConnectionData, "date">;

  return connectionData;
};
