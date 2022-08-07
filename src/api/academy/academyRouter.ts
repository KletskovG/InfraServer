import { Router } from "express";
import { registerHandler } from "api/registerHandler";
import {
  academyHandler,
  homeworksHandler,
  orderProjectHandler,
} from "api";

const academyRouter = Router();

registerHandler(
  academyRouter,
  "/academy",
  "get",
  academyHandler
);
registerHandler(
  academyRouter,
  "/academy/homeworks",
  "get",
  homeworksHandler
);
registerHandler(
  academyRouter,
  "/academy/order/:course",
  "get",
  orderProjectHandler
);

export default academyRouter;
