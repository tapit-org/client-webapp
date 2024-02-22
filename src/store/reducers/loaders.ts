import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	loaders: [],
};

export const loaders = createSlice({
	name: 'loaders',
	initialState,
	reducers: {
		addLoader: (state, action) => {
			return {
				...state,
				loaders: [...state.loaders, action.payload],
			};
		},
		removeLoader: (state, action) => {
            console.log({
				...state,
				loaders: [...state.loaders].filter((loader) => loader.id != action.payload),
			})
			return {
				...state,
				loaders: [...state.loaders].filter((loader) => loader.id != action.payload),
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { addLoader, removeLoader } = loaders.actions;

export default loaders.reducer;
