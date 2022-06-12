import { Router, RequestHandler } from "express";
import { ERoute, EHTTPMEthod } from "types";
import {
  homeHandler,
  cdHandler,
  doneHandler,
  doneMessageHandler,
  failHandler,
  academyHandler,
  cashHandler,
  budgetHandler,
  currencyHandler,
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
registerHandler("/cash", "get", cashHandler);
registerHandler("/budget/currency/:currency/:month/:year", "get", currencyHandler);
registerHandler("/budget/:category/:column/:start/:end/:course/:ruble", "get", budgetHandler);


export default router;
