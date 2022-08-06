import { Router } from "express";
import { registerHandler } from "./registerHandler";
import {
  homeHandler,
  cdHandler,
  doneHandler,
  doneMessageHandler,
  failHandler,
  academyHandler,
  homeworksHandler,
  cashHandler,
  budgetHandler,
  currencyHandler,
  budgetDatesHandler,
  orderProjectHandler,
  getMIRCurrencyHandler,
} from "api";

const router = Router();

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
  "/academy",
  "get",
  academyHandler
);
registerHandler(
  router,
  "/academy/homeworks",
  "get",
  homeworksHandler
);
registerHandler(
  router,
  "/academy/order/:course",
  "get",
  orderProjectHandler
);
registerHandler(
  router,
  "/shortcut/cash",
  "get",
  cashHandler
);
registerHandler(
  router,
  "/budget/currency/:currency/:month/:year",
  "get",
  currencyHandler
);
registerHandler(
  router,
  "/budget/mir/currency",
  "get",
  getMIRCurrencyHandler
);
registerHandler(
  router,
  "/budget/:category/:column/:start/:end/:course/:ruble",
  "get",
  budgetHandler,
);
registerHandler(
  router,
  "/budget/dates/:month/:year",
  "get",
  budgetDatesHandler,
);


export default router;
