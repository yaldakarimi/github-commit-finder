import { createSlice } from "@reduxjs/toolkit";

interface SearchValuesState {
	owner: string;
	repo: string;
}

const initialState: SearchValuesState = {
	owner: "",
	repo: "",
};

const searchReducer = createSlice({
	name: "search",
	initialState,
	reducers: {
		setOwner: (state, { payload }) => {
			state.owner = payload;
		},

		setRepo: (state, { payload }) => {
			state.repo = payload;
		},
	},
});
export const { setOwner, setRepo } = searchReducer.actions;
export default searchReducer.reducer;
