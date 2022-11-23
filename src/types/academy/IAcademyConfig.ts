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

const currentReact: Course<"react", "https://up.htmlacademy.ru/react/11"> = {
  name: "react",
  link: "https://up.htmlacademy.ru/react/11",
  protectActive: true,
  additional: {
    order: "/order_react",
    projects: "https://up.htmlacademy.ru/react/11/check/projects",
  }
};

export const academyScrapeConfig = [currentReact];
