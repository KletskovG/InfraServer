type Course = {
  name: string,
  link: string,
  guides: string,
}
type AcademyScrapeConfig = Array<Course>;

export const PAGE_TIMEOUT = 5000;

export const EMAIL_INPUT_SELECTOR = "#login-email";
export const PWD_INPUT_SELECTOR = "#login-password";
export const SUBMIT_BUTTON_SELECTOR = "input.button";
export const PROJECTS_PRESENTED_SELECTOR = ".up-info--check .button--green";


export const scrapeConfig: AcademyScrapeConfig = [];
