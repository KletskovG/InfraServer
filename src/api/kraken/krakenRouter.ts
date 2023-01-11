import { Router } from "express";
import { registerHandler } from "api/registerHandler";
import {
  mainLoopHandler, startLoopHandler, stopLoopHandler,
} from "api";

const krakenRouter = Router();

registerHandler(
  krakenRouter,
  "/kraken/mainloop",
  "get",
  mainLoopHandler,
);
registerHandler(
  krakenRouter,
  "/kraken/start",
  "get",
  startLoopHandler,
);
registerHandler(
  krakenRouter,
  "/kraken/stop",
  "get",
  stopLoopHandler,
);

export default krakenRouter;
