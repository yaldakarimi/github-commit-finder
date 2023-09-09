import React from "react";
import { TbMoodSearch } from "react-icons/tb";

const EmptyState = () => {
	return (
		<div className="bg-darkPurple shadow-md rounded-md p-6 flex flex-col justify-center items-center  gap-4 text-slate-300">
			<TbMoodSearch className="text-6xl text-slate-300 " />

			<p>Start the search to see the list of commits of a user!</p>
		</div>
	);
};

export default EmptyState;
