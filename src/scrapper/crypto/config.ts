import { getEnvVariable } from "utils/getEnvVariable";

export const CRYPTO_PAGE = {
  MY: getEnvVariable("CRYPTO_PAGE_MY"),
  SIGN_IN: getEnvVariable("CRYPTO_PAGE_SIGN_IN"),
};

export enum ECryptoSelector {
  EMAIL_INPUT = "input[type=\"email\"]",
  PWD_INPUT = "input[type=\"password\"]",
  SIGN_IN_BUTTON = "input[name=\"commit\"]",
}
