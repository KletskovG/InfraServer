import { Router } from "express";
import { registerHandler } from "./registerHandler";
import {
  homeHandler,
  cdHandler,
  doneHandler,
  doneMessageHandler,
  failHandler,
  flushLogsHandler,
} from "api";

import budgetRouter from "api/budget/budgetRouter";
import academyRouter from "api/academy/academyRouter";
import xmrRouter from "api/xmr/xmrRouter";


export function buildRouter(): Router {
  const router = Router();

  router.use(budgetRouter);
  router.use(academyRouter);
  router.use(xmrRouter);

  registerHandler(
    router,
    "/",
    "get",
    homeHandler
  );
  registerHandler(
    router,
    "/cd",
    "get",
    cdHandler
  );
  registerHandler(
    router,
    "/done",
    "get",
    doneHandler
  );
  registerHandler(
    router,
    "/done/:text",
    "get",
    doneMessageHandler
  );
  registerHandler(
    router,
    "/fail",
    "get",
    failHandler
  );
  registerHandler(
    router,
    "/logs/flush",
    "get",
    flushLogsHandler,
  );

  return router;
}
