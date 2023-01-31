import { FormItemRule } from "element-plus";
import { Arrayable } from "element-plus/es/utils";

export type FormRules<T> = {
  [key in keyof T]?: Arrayable<FormItemRule>;
};
