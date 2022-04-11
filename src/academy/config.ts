type AcademyScrapeConfig = Record<string, string>;

export const PAGE_TIMEOUT = 5000;

export const EMAIL_INPUT_SELECTOR = "#login-email";
export const PWD_INPUT_SELECTOR = "#login-password";
export const SUBMIT_BUTTON_SELECTOR = "input.button";
export const PROJECTS_PRESENTED_SELECTOR = ".up-info--check .button--green";

export const scrapeConfig: AcademyScrapeConfig = {
  JS1: "https://up.htmlacademy.ru/javascript/25/check/projects",
};
  