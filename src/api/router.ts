import { Router, RequestHandler } from "express";
import { ERoute, EHTTPMEthod } from "types";
import {
  homeHandler,
  cdHandler,
  doneHandler,
  doneMessageHandler,
  failHandler,
  academyHandler,
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


export default router;
