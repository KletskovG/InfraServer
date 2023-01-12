import { Router } from "express";
import { registerHandler } from "api/registerHandler";
import {
  mainLoopHandler,
  startLoopHandler,
  stopLoopHandler,
  prepareTickersHandler,
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

registerHandler(
  krakenRouter,
  "/kraken/tickers/prepare",
  "get",
  prepareTickersHandler,
);

export default krakenRouter;
