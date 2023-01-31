import { FormInstance, FormItemRule } from "element-plus";
import { Arrayable } from "element-plus/es/utils";
import { reactive, ref } from "vue";

type FormRules<T> = {
  [key in keyof T]?: Arrayable<FormItemRule>;
};

interface Props<T extends object> {
  defaultValues: T;
  rules?: FormRules<T>;
}

export function useForm<T extends object>({ defaultValues, rules }: Props<T>) {
  // Element UI Form Ref
  const formRef = ref<FormInstance>();

  //  Element UI Form Values
  const form = reactive(defaultValues);

  // Element UI Form Rules
  const formRules = reactive<FormRules<T>>(rules || {});

  return {
    formRef,
    form,
    formRules,
  };
}
