import { ICommonModel } from "./ICommon";
import { IPost } from "./IPost";
import { IUser } from "./IUser";

export interface IComment extends ICommonModel {
  comment: string;
  postId: string;
  userId: string;
}
