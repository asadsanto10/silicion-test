/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchTerm: '',
};

const bookFilterSlice = createSlice({
	name: 'bookFilter',
	initialState,
	reducers: {
		filterSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
	},
});

export default bookFilterSlice;
export const { filterSearchTerm } = bookFilterSlice.actions;
