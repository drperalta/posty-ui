import { ServerZodError } from "../interface/IError";

export function parseServerZodErrors<T extends object>(
  errors?: ServerZodError[]
) {
  if (!errors || errors.length <= 0) return undefined;

  const errorsObj: { [key in keyof T]?: string } = {};

  errors.forEach((err) => {
    const key = err.path.join(".") as keyof typeof errorsObj;
    errorsObj[key] = err.message;
  });

  return errorsObj;
}
