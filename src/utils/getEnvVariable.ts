import * as path from "path";
import * as fs from "fs";
import { EEnvVariable } from "types/EEnvVariable";

export const getEnvVariable = (envVariable: EEnvVariable): string => {
  return process.env[envVariable] ?? readEnvVariable(envVariable);
};

function readEnvVariable(envVariable: EEnvVariable) {
  let result;
  try {
    const envFile = fs.readFileSync(path.join(__dirname, ".env"), "utf-8");
    const envVariables = envFile.split("====").map(str => str.split("="));
    result = envVariables.find((variable) => {
      return variable[0].replace(/\n/g, "") === envVariable;
    });
  } catch (error) {
    result = `EMTY_ENV_VARIABLE ${envVariable}`;
    console.info(result);
  }
  
  return result;
}