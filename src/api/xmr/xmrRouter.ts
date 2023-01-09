import { Router } from "express";
import { registerHandler } from "api/registerHandler";
import {
  xmrSyncHandler,
} from "api";

const xmrRouter = Router();

registerHandler(
  xmrRouter,
  "/xmr/sync",
  "get",
  xmrSyncHandler,
);

export default xmrRouter;
