// TODO: rename
export type orderBotCommand = "/order";
export type openedCoursesNames = "react" | "js1" | "js2";

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

const currentJS1: Course<"js1", "https://up.htmlacademy.ru/javascript/27"> = {
  name: "js1",
  link: "https://up.htmlacademy.ru/javascript/27",
  protectActive: true,
  additional: {
    order: "/order_js1",
    projects: "https://up.htmlacademy.ru/javascript/27/check/projects",
  }
};


export const academyScrapeConfig = [currentJS1];
