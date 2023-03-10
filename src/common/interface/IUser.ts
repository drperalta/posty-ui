import { ICommonModel } from "./ICommon";

export interface IUser extends ICommonModel {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
}

export type IUserUpdatePayload = Partial<
  Omit<IUser, "id" | "createdAt" | "updatedAt" | "full_name">
>;
