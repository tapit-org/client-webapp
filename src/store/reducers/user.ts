// types
import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
	uid: null,
	name: null,
	email: null,
	emailVerified: false,
	phoneNumber: null,
	createdAt: null,
	lastLoginAt: null,
	provider: null,
	loading: true,
	creating: false,
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
	name: "user",
	initialState,
	reducers: {
		initUser: (state) => {
			return {
				...state,
				loading: true,
			};
		},
		setUser: (state, action) => {
			return {
				...state,
				...action.payload,
				loading: false,
			};
		},
		removeUser: (state) => {
			return {
				...initialState,
				loading: false,
			};
		},
		startCreatingUser: (state) => {
			return {
				...state,
				creating: true,
				loading: true,
			};
		},
		endCreatingUser: (state) => {
			return {
				...state,
				creating: false,
			};
		},
	},
});

export default user.reducer;

export const {
	initUser,
	setUser,
	removeUser,
	startCreatingUser,
	endCreatingUser,
} = user.actions;
