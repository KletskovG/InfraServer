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


export const scrapeConfig: AcademyScrapeConfig = [
  {
    name: "Async Node.js",
    link: "https://up.htmlacademy.ru/nodejs/3/check/projects",
    guides: "Guides in Progress",
  },
  {
    name: "JS 1",
    link: "https://up.htmlacademy.ru/javascript/26/check/projects",
    guides: "https://github.com/KletskovG/academy_storage/tree/main/js1",
  }
];
