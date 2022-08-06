import { Router, RequestHandler } from "express";
import { ERoute, EHTTPMethod } from "types";

export function registerHandler(
  router: Router,
  route: ERoute,
  method: EHTTPMethod,
  handler: RequestHandler,
) {
  router[method](route, handler);
}
