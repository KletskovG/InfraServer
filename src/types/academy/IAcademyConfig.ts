export type orderBotCommand = "/order";
export type openedCoursesNames = "react" | "js1" | "js2";

type CourseConfig<name extends openedCoursesNames, url extends string> = {
  name: name,
  link: url;
  additional: {
    order?: `${orderBotCommand}_${name}`;
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
  additional: {
    order: "/order_react",
  },
};

export const academyScrapeConfig = [currentReact];
