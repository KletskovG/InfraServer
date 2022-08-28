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

const currentReact: Course<"react", "https://up.htmlacademy.ru/react/10"> = {
  name: "react",
  link: "https://up.htmlacademy.ru/react/10",
  protectActive: false,
  additional: {
    order: "/order_react",
    projects: "https://up.htmlacademy.ru/react/10/check/projects",
  },
};

const currentJS2: Course<"js2", "https://up.htmlacademy.ru/ecmascript/18"> = {
  name: "js2",
  link: "https://up.htmlacademy.ru/ecmascript/18",
  protectActive: false,
  additional: {
    order: "/order_js2",
    projects: "https://up.htmlacademy.ru/ecmascript/18/check/projects",
  }
};

export const academyScrapeConfig = [currentReact, currentJS2];
