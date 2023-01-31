import { Reaction } from "../enum/reaction";
import { ICommonModel } from "./ICommon";

export interface IReact extends ICommonModel {
  reaction: Reaction;
  postId: string;
  userId: string;
}
