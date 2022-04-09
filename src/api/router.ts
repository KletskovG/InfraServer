import { Router, RequestHandler } from "express";
import { ERoute, EHTTPMEthod } from "types";
import {
  homeHandler,
  cdHandler,
} from "api";

const router = Router();

function registerHandler(route: ERoute, method: EHTTPMEthod, handler: RequestHandler) {
  router[method](route, handler);
}

registerHandler("/", "get", homeHandler);
registerHandler("/cd", "get", cdHandler);
registerHandler("/done", "get", cdHandler);

export default router;
