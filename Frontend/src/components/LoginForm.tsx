/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authAPI';
import { setLoginDetails } from '../redux/features/auth/authSlice';
import { useAppDispatch } from '../redux/hook';
import { IErrorResponse } from '../types/interface';
import Error from './ui/Error';

export interface LoginFormInputs {
	email: string;
	password: string;
}

const LoginForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	const dispatch = useAppDispatch();
	const naviaget = useNavigate();
	const [loginUser, { data, isLoading, error, isError }] = useLoginUserMutation();

	const onSubmit: SubmitHandler<LoginFormInputs> = (inputData: LoginFormInputs): void => {
		loginUser(inputData);
	};

	// console.log(data?.data?.accessToken);

	useEffect(() => {
		if (data?.status) {
			dispatch(setLoginDetails({ accessToken: data?.data?.accessToken }));
			naviaget('/');
		}
	}, [data?.data?.accessToken, data?.status, dispatch, naviaget]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
			<div>
				<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
					Your email
				</label>
				<input
					type="email"
					id="email"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="name@company.com"
					{...register('email', { required: 'Email is required' })}
				/>
				{errors.email && <p className="text-red-400">{errors.email.message}</p>}
			</div>
			<div>
				<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
					Password
				</label>
				<input
					type="password"
					id="password"
					placeholder="••••••••"
					className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					{...register('password', { required: 'Password is required' })}
				/>
				{errors.password && <p className="text-red-400">{errors.password.message}</p>}
			</div>

			<button
				disabled={isLoading}
				type="submit"
				className="w-full disabled:bg-indigo-400 bg-indigo-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
			>
				Sign in
			</button>

			{isError && <Error message={(error as IErrorResponse).data?.message} />}
		</form>
	);
};

export default LoginForm;
