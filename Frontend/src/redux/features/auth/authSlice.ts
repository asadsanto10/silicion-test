import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface ISetLoginDetails {
	accessToken: string;
	isLoggedIn: boolean;
}

const initialState: ISetLoginDetails = {
	accessToken: '',
	isLoggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setLoginDetails: (state, action: PayloadAction<{ accessToken: string }>) => {
			state.accessToken = action.payload.accessToken;
			state.isLoggedIn = true;
		},
		logout: (state) => ({ ...state, ...initialState }),
	},
});

export default authSlice;

export const { setLoginDetails, logout } = authSlice.actions;
