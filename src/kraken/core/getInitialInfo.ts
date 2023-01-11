import { log } from "logger/logger";

export function  getInitialInfo() {
  const result = "INITIAL INFO RETURN";
  log("Info", `KRAKEN: getInitialInfo: ${result}`);
  return result;
}
