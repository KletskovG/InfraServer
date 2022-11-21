import { Router } from "express";
import { registerHandler } from "./registerHandler";
import {
  homeHandler,
  cdHandler,
  doneHandler,
  doneMessageHandler,
  failHandler,
  cashHandler,
  monitorHandler,
} from "api";

import budgetRouter from "api/budget/budgetRouter";
import cryptoRouter from "api/crypto/cryptoRouter";
import academyRouter from "api/academy/academyRouter";


export function buildRouter(): Router {
  const router = Router();

  router.use(budgetRouter);
  router.use(cryptoRouter);
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
    "/shortcut/cash",
    "get",
    cashHandler
  );
  registerHandler(
    router,
    "/monitor",
    "get",
    monitorHandler,
  );

  return router;
}
