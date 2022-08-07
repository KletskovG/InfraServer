import { Router } from "express";
import { registerHandler } from "api/registerHandler";
import {
  cryptoHandler,
} from "api";

const cryptoRouter = Router();

registerHandler(
  cryptoRouter,
  "/crypto",
  "get",
  cryptoHandler,
);

export default cryptoRouter;
