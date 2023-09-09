import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SampleOwnerAndRepo } from "app/types/common";
import { fetchCommits, clearCommits } from "app/reducers/commitsReducer";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setOwner, setRepo } from "app/reducers/searchReducer";
import {
	Error,
	FormTextInput,
	Layout,
	Loader,
	EmptyState,
} from "components/common";
import CommitCard from "components/CommitCard";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";

const SAMPLE_DATA: Array<SampleOwnerAndRepo> = [
	{
		sampleOwner: "facebook",
		sampleRepo: "react",
	},

	{
		sampleOwner: "google",
		sampleRepo: "vizier",
	},

	{
		sampleOwner: "reduxjs",
		sampleRepo: "redux-toolkit",
	},
];

const HomePage = () => {
	const [validationError, setValidationError] = useState<string>("");
	const dispatch = useAppDispatch();
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const ownerParam = queryParams.get("owner");
	const repoParam = queryParams.get("repo");

	const {
		items: commits,
		status,
		error,
	} = useAppSelector((state) => state.commits);
	const { owner, repo } = useAppSelector((state) => state.search);

	const updateUrl = (owner: string, repo: string) => {
		const queryParams = `?owner=${encodeURIComponent(
			owner
		)}&repo=${encodeURIComponent(repo)}`;

		window.history.pushState({}, "", queryParams);
	};

	useEffect(() => {
		if (ownerParam && repoParam) {
			dispatch(setOwner(ownerParam));
			dispatch(setRepo(repoParam));
			dispatch(
				fetchCommits({
					owner: ownerParam.toLowerCase(),
					repo: repoParam.toLowerCase(),
				})
			);
		}
	}, [ownerParam, repoParam, dispatch]);

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!owner || !repo) {
			let message = "";
			if (!owner && !repo) {
				message = "Search fields cannot be empty";
			} else if (!repo) {
				message = "Repository field cannot be empty";
			} else {
				message = "Owner fields cannot be empty";
			}
			setValidationError(message);
			dispatch(clearCommits());
			return;
		}
		setValidationError("");
		updateUrl(owner, repo);
		dispatch(
			fetchCommits({ owner: owner.toLowerCase(), repo: repo.toLowerCase() })
		);
	};

	const handleClear = () => {
		dispatch(clearCommits());
		dispatch(setOwner(""));
		dispatch(setRepo(""));
	};

	const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setOwner(event.target.value));
	};

	const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setRepo(event.target.value));
	};

	const handleSampleItemClick = (sampleOwner: string, sampleRepo: string) => {
		dispatch(setOwner(sampleOwner));
		dispatch(setRepo(sampleRepo));
	};
	return (
		<Layout title="Github Commits Finder | Home">
			<div className="flex flex-col items-center justify-center mb-8">
				<form onSubmit={handleSearch} className="flex gap-4 items-center">
					<FormTextInput
						value={owner}
						onChange={handleUserChange}
						id="userInput"
						label="Owner:"
						placeholder="e.g. google"
						inputCustomClasses={
							!owner && validationError ? "border-2 border-red-600" : ""
						}
					/>

					<FormTextInput
						value={repo}
						onChange={handleRepoChange}
						id="repoInput"
						label="Repository:"
						placeholder="e.g. vizier"
						inputCustomClasses={
							!repo && validationError ? "border-2 border-red-600" : ""
						}
					/>

					<div className="flex items-center gap-2 self-end">
						<button type="submit" className="button bg-yellow-600">
							<FaSearch className="text-white" />
						</button>
						<div className="button bg-red-900">
							<MdClear
								type="click"
								onClick={handleClear}
								className="text-white "
							/>
						</div>
					</div>
				</form>

				{validationError && (
					<span className="mt-2 text-sm text-red-600">{validationError}</span>
				)}
			</div>

			<div className="mb-8 md:flex flex-col items-center">
				<p className="mb-2 text-sm text-slate-700 italic ">
					Note: To start your search you can click on the examples below:
				</p>
				<ul className="flex flex-wrap gap-2">
					{SAMPLE_DATA.map(({ sampleOwner, sampleRepo }, index) => (
						<li
							key={index}
							onClick={() => handleSampleItemClick(sampleOwner, sampleRepo)}
							className="bg-accent py-2 px-4 rounded-md max-w-xs text-sm cursor-pointer"
						>
							{sampleOwner} / {sampleRepo}
						</li>
					))}
				</ul>
			</div>
			{status === "idle" && (
				<div className="md:px-6">
					<EmptyState />
				</div>
			)}
			{status === "loading" && <Loader />}
			{status === "failed" && (
				<div className="md:px-6">
					<Error error={error} />
				</div>
			)}
			{status === "succeeded" && (
				<div className="md:px-6">
					{!!commits &&
						commits?.length > 0 &&
						commits.map((commit) => (
							<CommitCard key={commit.sha} data={commit} />
						))}
				</div>
			)}
		</Layout>
	);
};

export default HomePage;
