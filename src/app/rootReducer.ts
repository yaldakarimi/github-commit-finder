import { combineReducers } from "@reduxjs/toolkit";
import commitsReducer from "./reducers/commitsReducer";
import searchReducer from "./reducers/searchReducer";

const rootReducer = combineReducers({
	commits: commitsReducer,
	search: searchReducer,
});

export default rootReducer;
