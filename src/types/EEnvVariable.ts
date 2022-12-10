export type EEnvVariable =
    "BOT_TOKEN" |
    "CHAT_NUMBER" |
    "PORT" |
    "ACADEMY_EMAIL" |
    "ACADEMY_PWD" |
    "ACADEMY_CHAT" |
    "ACADEMY_SECOND"


export enum EArgvVariable {
  BOT_TOKEN = 2,
  CHAT_NUMBER,
  PORT,
  ACADEMY_EMAIL,
  ACADEMY_PWD,
  ACADEMY_CHAT,
  ACADEMY_SECOND,
}

export const ArgvMap: Record<EEnvVariable, EArgvVariable> = {
  BOT_TOKEN: 2,
  CHAT_NUMBER: 3,
  PORT: 4,
  ACADEMY_EMAIL: 5,
  ACADEMY_PWD: 6,
  ACADEMY_CHAT: 7,
  ACADEMY_SECOND: 8,
};
