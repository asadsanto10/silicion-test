import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { createToken } from '../../../helpers/jwt.helper';

import { User } from '../user/user.model';
import { ILoginUserResponse, IUserRequestBody } from './auth.interface';

const userLogin = async (loginData: IUserRequestBody): Promise<ILoginUserResponse | null> => {
	const { email, password } = loginData;

	// check use existing or not existing
	const isUserExist = await User.isUserExist(email);

	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	// check password is correct
	const isCorrectPassword = await User.isPasswordMatched(password, isUserExist.password);

	if (isUserExist.password && !isCorrectPassword) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
	}

	const { _id: userId, email: userEmail } = isUserExist as unknown as {
		_id: string;
		email: string;
	};

	const accessToken = createToken(
		{ userId, email: userEmail },
		variable.jwtSecret as Secret,
		variable.jwtExpiresIn as string
	);

	return {
		accessToken,
	};
};

export const authService = { userLogin };
