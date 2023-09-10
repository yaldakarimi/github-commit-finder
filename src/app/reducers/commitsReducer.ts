import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommitListItem } from "../types/common";

interface CommitsState {
	items: Array<CommitListItem>;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: CommitsState = {
	items: [],
	status: "idle",
};

export const fetchCommits = createAsyncThunk<
	Array<CommitListItem>,
	{ owner: string; repo: string }
>("commits/fetchCommits", async ({ owner, repo }, { rejectWithValue }) => {
	const res = await fetch(
		`https://api.github.com/repos/${owner}/${repo}/commits`,
		{
			// TODO @Reviewers: add your own token
			// headers: { Authorization: "" },
		}
	);
	const data = await res.json();

	try {
		if (!res.ok) {
			return rejectWithValue(data.message);
		} else {
			return data;
		}
	} catch (error: any) {
		if (error.response) {
			return rejectWithValue(error.response.data);
		}
	}
});

const commitsReducer = createSlice({
	name: "commits",
	initialState,
	reducers: {
		clearCommits: (state) => {
			state.items = [];
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchCommits.pending, (state) => {
			state.status = "loading";
		});

		builder.addCase(fetchCommits.fulfilled, (state, { payload }) => {
			state.status = "succeeded";
			state.items = payload;
		});

		builder.addCase(fetchCommits.rejected, (state, { payload }) => {
			state.status = "failed";
			state.error = payload as string;
		});
	},
});
export const { clearCommits } = commitsReducer.actions;

export default commitsReducer.reducer;
