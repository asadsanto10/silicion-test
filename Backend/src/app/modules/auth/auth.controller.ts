import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IUserRequestBody } from './auth.interface';
import { authService } from './auth.service';

export const loginUser: RequestHandler = async (req, res, next): Promise<void> => {
	try {
		const { ...loginData } = req.body as IUserRequestBody;
		const result = await authService.userLogin(loginData);

		const tokenData = result as ILoginUserResponse;

		sendResponse<ILoginUserResponse>(res, {
			statusCode: httpStatus.OK,
			status: true,
			message: 'User logged in successfully',
			data: tokenData,
		});
	} catch (error) {
		next(error);
	}
};
