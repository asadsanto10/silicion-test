import type { LoginFormInputs } from '../../../components/LoginForm';
import { apiSlice } from '../../api/apiSlice';

const authAPI = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loginUser: builder.mutation({
			query: (data: LoginFormInputs) => ({
				url: '/auth/login',
				method: 'POST',
				body: data,
			}),
		}),
	}),
});

export const { useLoginUserMutation } = authAPI;
