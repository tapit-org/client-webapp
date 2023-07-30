// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
	uid: null,
	name: null,
	email: null,
	image: null,
	type: null,
	active: null,
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			return {
				...state,
				uid: action.payload.uid,
				name: action.payload.name,
				email: action.payload.email,
				image: action.payload.displayImage,
				type: action.payload.type,
				active: action.payload.active,
			};
		},
		removeUser: (state) => {
			return {
				...state,
				uid: null,
				name: null,
				email: null,
				displayImage: null,
				type: null,
				active: null,
			};
		},
	},
});

export default user.reducer;

export const { setUser, removeUser } = user.actions;
