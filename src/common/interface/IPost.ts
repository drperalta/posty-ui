import { IComment } from "./IComment";
import { ICommonModel } from "./ICommon";
import { IReact } from "./IReact";
import { IUser } from "./IUser";

export interface IPost extends ICommonModel {
  content: string;
  userId: string;
  User: IUser;
  Comments: IComment[];
  Reacts: IReact[];
}
