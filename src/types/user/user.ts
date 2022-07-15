export interface RegisterUserRes {
    id: string;
    name: string;
    lastName: string;
    email: string;
}

export type UserInfoForAdminRes = RegisterUserRes;

export type UpdateUserPwdRes = DeleteAccountRes

export type DeleteAccountRes = {
    message: string;
    isSuccess: true;
} | {
    message: string;
    isSuccess: false;
}