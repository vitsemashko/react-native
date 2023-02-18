import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userId: null,
	nickname: null,
	stateChanged: false,
};
const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		updateUserId: (state, { payload }) => ({
			...state,
			userId: payload,
		}),
		updateUserNickname: (state, { payload }) => ({
			...state,
			nickname: payload,
		}),
		authStateChanged: (state, { payload }) => ({
			...state,
			stateChanged: payload,
		}),
		resetUser: (state, { payload }) => ({
			...initialState,
		}),
	},
});
export const { updateUserId, updateUserNickname, resetUser, authStateChanged } =
	authSlice.actions;

export default authSlice.reducer;
