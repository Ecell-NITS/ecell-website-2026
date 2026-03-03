export type ApiErrorResponse = {
  message?: string;
};

export type AuthSuccessResponse<T> = {
  data: T;
};

export type LoginRegisterData<UserType = unknown> = {
  accessToken: string;
  user: UserType;
};

export type CheckEmailResponse = {
  exists: boolean;
};
