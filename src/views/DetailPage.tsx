import { useParams, Link } from "react-router-dom";
import useFetch from "hooks/useFetch";
import { CommitFile, Commit } from "app/types/common";
import { formatDate } from "app/helpers";
import { Loader, Error, Layout } from "components/common";
import FileCard from "components/DetailPage/FileCard";
import { FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";

const DetailPage = () => {
	const { sha, owner, repo } = useParams();

	const { isLoading, data, fetchError } = useFetch<Commit>(
		`https://api.github.com/repos/${owner}/${repo}/commits/${sha}`
	);

	return (
		<Layout title="Github Commits Finder  | Details">
			<Link to={`/?owner=${owner}&repo=${repo}`}>
				<div className="button mb-8 flex gap-2 items-center bg-primary text-white">
					<FaArrowLeft />
					<span>Back to list</span>
				</div>
			</Link>

			{isLoading && <Loader />}
			{!!fetchError && <Error error={fetchError} />}
			{!!data && (
				<div className="md:p-6">
					<div className="flex flex-col items-center justify-center mb-8 md:flex-row md:justify-start md:gap-8 ">
						<img
							src={data.author.avatar_url}
							alt="user avatar"
							className="rounded-full w-64 border-2 border-darkPurple mb-4"
						/>
						<div>
							<span className="mb-2 text-2xl hidden md:block">Owner: </span>
							<h1 className="text-2xl font-bold md:text-4xl">
								{data.commit.author.name}
							</h1>
						</div>
					</div>
					<div className="card mb-8 bg-darkPurple lightText ">
						<div>
							<div>
								<h2 className="font-bold textYellow">Basic Information</h2>

								<div className="mb-2">
									<span className="text-sm text-accent">Message:</span>
									<span> {data.commit.message}</span>
								</div>

								<div className="mb-2">
									<span className="text-sm text-accent">Date:</span>
									<span> {formatDate(data.commit.author.date)}</span>
								</div>
							</div>

							<div>
								<h2 className=" textYellow mb-2 font-bold">General Stats:</h2>
								<div className="flex justify-between md:justify-start md:gap-6">
									<div className="flex gap-1 items-center">
										<FaPlus className="text-green-600" />
										<span className="text-green-600 text-xl">
											{data.stats.additions}
										</span>
									</div>

									<div className=" flex gap-1 items-center">
										<FaMinus className="text-red-600" />
										<span className="text-red-600 text-xl">
											{data.stats.deletions}
										</span>
									</div>

									<div>
										<span className="text-sm lightText">Total: </span>
										<span className=" text-xl">{data.stats.total}</span>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-col flex-wrap items-stretch justify-center gap-2 lg:flex-row ">
						{data.files.map((file: CommitFile, index: number) => (
							<FileCard
								filename={file.filename}
								status={file.status}
								additions={file.additions}
								deletions={file.deletions}
								key={index}
							/>
						))}
					</div>
				</div>
			)}
		</Layout>
	);
};

export default DetailPage;
