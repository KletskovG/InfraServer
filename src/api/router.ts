import { Router, RequestHandler } from "express";
import { ERoute, EHTTPMEthod } from "types";
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
  wakeHandler,
  wakeIpadHandler,
  budgetDatesHandler,
  orderProjectHandler,
  getMIRCurrencyHandler,
} from "api";

const router = Router();

function registerHandler(route: ERoute, method: EHTTPMEthod, handler: RequestHandler) {
  router[method](route, handler);
}

registerHandler("/", "get", homeHandler);
registerHandler("/cd", "get", cdHandler);
registerHandler("/done", "get", doneHandler);
registerHandler("/done/:text", "get", doneMessageHandler);
registerHandler("/fail", "get", failHandler);
registerHandler("/academy", "get", academyHandler);
registerHandler("/academy/homeworks", "get", homeworksHandler);
registerHandler("/academy/order/:course", "get", orderProjectHandler);
registerHandler("/shortcut/cash", "get", cashHandler);
registerHandler("/shortcut/wake", "get", wakeHandler);
registerHandler("/shortcut/wake/ipad", "get", wakeIpadHandler);
registerHandler("/budget/currency/:currency/:month/:year", "get", currencyHandler);
registerHandler("/budget/mir/currency", "get", getMIRCurrencyHandler);
registerHandler("/budget/:category/:column/:start/:end/:course/:ruble", "get", budgetHandler);
registerHandler("/budget/dates/:month/:year", "get", budgetDatesHandler);


export default router;
