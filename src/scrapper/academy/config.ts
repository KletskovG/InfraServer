type Course = {
  name: string,
  link: string,
  guides: string,
}
type AcademyScrapeConfig = Array<Course>;

export const PAGE_TIMEOUT = 5000;

export enum ESelector {
  HOMEWORK = ".card__item--new",
  STUDENTS_COL = ".up-interface__right-col",

  EMAIL_INPUT = "#login-email",
  PWD_INPUT = "#login-password",
  SUBMIT_BUTTON = ".button--full-width",
  PROJECTS_PRESENTED = ".up-info--check .button--green"
}

export const scrapeConfig: AcademyScrapeConfig = [
  {
    name: "react",
    link: "https://up.htmlacademy.ru/react/10/check/projects",
    guides: "Testing",
  }
];

export const homeworkConfig: AcademyScrapeConfig = [
  {
    name: "react",
    link: "https://up.htmlacademy.ru/react/10",
    guides: "",
  },
];
