/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	dataPerPage: 3,
	currentPage: 1,
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		chnageDataPageWise: (state, action) => {
			state.currentPage = action.payload;
		},
	},
});

export const { chnageDataPageWise } = paginationSlice.actions;
export default paginationSlice;
