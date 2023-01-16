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

const currentJs2: Course<"js2", "https://up.htmlacademy.ru/ecmascript/19"> = {
  name: "js2",
  link: "https://up.htmlacademy.ru/ecmascript/19",
  protectActive: true,
  additional: {
    order: "/order_js2",
    projects: "https://up.htmlacademy.ru/ecmascript/19/check/projects",
  }
};

export const academyScrapeConfig = [currentJs2];
