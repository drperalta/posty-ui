export interface ICommonModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommonMutationCallbacks<T = any, E = unknown> {
  onSuccess?: (response: T) => void;
  onError?: (error: E) => void;
}
