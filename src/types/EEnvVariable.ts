export type EEnvVariable =
    "BOT_TOKEN" |
    "CHAT_NUMBER" |
    "PORT" |
    "ACADEMY_EMAIL" |
    "ACADEMY_PWD" |
    "ACADEMY_CHAT" |
    "ACADEMY_SECOND" |
    "CRYPTO_EMAIL" |
    "CRYPTO_PWD" |
    ECryptoPage

export type ECryptoPage =
  "CRYPTO_PAGE_MY" |
  "CRYPTO_PAGE_SIGN_IN"

export enum EArgvVariable {
  BOT_TOKEN = 2,
  CHAT_NUMBER,
  PORT,
  ACADEMY_EMAIL,
  ACADEMY_PWD,
  ACADEMY_CHAT,
  ACADEMY_SECOND,
  CRYPTO_EMAIL,
  CRYPTO_PWD,
  CRYPTO_PAGE_MY,
  CRYPTO_PAGE_SIGN_IN,
}

export const ArgvMap: Record<EEnvVariable, EArgvVariable> = {
  BOT_TOKEN: 2,
  CHAT_NUMBER: 3,
  PORT: 4,
  ACADEMY_EMAIL: 5,
  ACADEMY_PWD: 6,
  ACADEMY_CHAT: 7,
  ACADEMY_SECOND: 8,
  CRYPTO_EMAIL: 9,
  CRYPTO_PWD: 10,
  CRYPTO_PAGE_MY: 11,
  CRYPTO_PAGE_SIGN_IN: 12,
};
