import React from "react";
import { TbMoodSearch } from "react-icons/tb";

const EmptyState = () => {
	return (
		<div className="flex flex-col justify-center items-center gap-4 shadow-md rounded-md p-6 bg-darkPurple lightText">
			<TbMoodSearch className="text-6xl lightText " />

			<p>Start the search to see the list of commits of a user!</p>
		</div>
	);
};

export default EmptyState;
