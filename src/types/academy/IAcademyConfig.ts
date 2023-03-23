export type orderBotCommand = "/order";
export type openedCoursesNames = "react" | "js1" | "js2" | "nodeapi";

type CourseConfig<name extends openedCoursesNames, url extends string> = {
  name: name,
  link: url;
  protectActive: boolean;
  additional: {
    order?: `${orderBotCommand}_${name}`;
    projects: `${url}/check/projects`;
  }
}
type Course<name extends openedCoursesNames, url extends string>  = {
  additional: {
    guides?: string;
  },
} & CourseConfig<name, url>;

const currentJs1: Course<"js1", "https://up.htmlacademy.ru/javascript/28"> = {
  name: "js1",
  link: "https://up.htmlacademy.ru/javascript/28",
  protectActive: true,
  additional: {
    order: "/order_js1",
    projects: "https://up.htmlacademy.ru/javascript/28/check/projects",
  }
};

export const academyScrapeConfig = [currentJs1];
