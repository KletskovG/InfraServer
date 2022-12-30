import { Router } from "express";
import { registerHandler } from "api/registerHandler";
import {
  payoutCheckHandler,
  xmrSyncHandler,
} from "api";

const xmrRouter = Router();

registerHandler(
  xmrRouter,
  "/xmr/share",
  "get",
  payoutCheckHandler,
);
registerHandler(
  xmrRouter,
  "/xmr/sync",
  "get",
  xmrSyncHandler,
);

export default xmrRouter;
