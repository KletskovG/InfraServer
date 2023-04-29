export type orderBotCommand = "/order";
export type openedCoursesNames = "react" | "js1" | "js2" | "nodeapi" | "nest";

export interface ICourseModel<name = string, url = string> {
  name: name;
  link: url;
  protectActive: boolean;
  additional?: {
    order?: name extends openedCoursesNames ? `${orderBotCommand}_${name}` : string;
    projects: string;
  }
}
