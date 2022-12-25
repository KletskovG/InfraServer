import { Router } from "express";
import { registerHandler } from "./registerHandler";
import {
  homeHandler,
  cdHandler,
  doneHandler,
  doneMessageHandler,
  xmrSyncHandler,
  failHandler,
} from "api";

import budgetRouter from "api/budget/budgetRouter";
import academyRouter from "api/academy/academyRouter";


export function buildRouter(): Router {
  const router = Router();

  router.use(budgetRouter);
  router.use(academyRouter);

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
    "/xmrsync",
    "post",
    xmrSyncHandler,
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

  return router;
}
