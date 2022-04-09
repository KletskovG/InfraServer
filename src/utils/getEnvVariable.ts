import * as path from "path";
import * as fs from "fs";
import { EEnvVariable } from "types/EEnvVariable";

export const getEnvVariable = (envVariable: EEnvVariable): string => {
  return process.env[envVariable] ?? readEnvVariable(envVariable);
};

function readEnvVariable(envVariable: EEnvVariable) {
  const envFile = fs.readFileSync(path.join(__dirname, ".env"), "utf-8");
  const envVariables = envFile.split("====").map(str => str.split("="));
  const result = envVariables.find((variable) => {
    return variable[0].replace(/\n/g, "") === envVariable;
  });
  return result[1] ?? null;
}