export interface IUserRequestBody {
	email: string;
	password: string;
}

export interface ILoginUserResponse {
	accessToken: string;
}
export type IRefreshTokenResponse = {
	accessToken: string;
};
