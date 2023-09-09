import { Link } from "react-router-dom";
import { useAppSelector } from "app/hooks";
import { CommitListItem } from "app/types/common";
import { formatDate } from "app/helpers";
import { FaArrowRight } from "react-icons/fa6";

interface Props {
	data: CommitListItem;
}
const CommitCard = ({ data }: Props) => {
	const { owner, repo } = useAppSelector((state) => state.search);
	const { commit, sha } = data;

	return (
		<div className="bg-darkPurple mb-4 rounded-md p-4 text-slate-200 shadow-md cursor-pointer hover:transform hover:scale-95 transition-transform duration-300">
			<Link to={`/commit/${owner}/${repo}/${sha}`}>
				<div className="mb-2">
					<span className="text-sm text-yellow-600">Owner: </span>
					<span>{commit.author.name}</span>
				</div>
				<div className="mb-2">
					<span className="text-sm text-yellow-600">Message: </span>
					<span className="truncatedText">{commit.message}</span>
				</div>
				<div className="mb-2">
					<span className="text-sm text-yellow-600">Date: </span>
					{formatDate(commit.author.date)}
				</div>
				<div className="flex items-center justify-end gap-2">
					<span className="text-yellow-500 text-sm"> See more details</span>
					<FaArrowRight className="text-yellow-500" />
				</div>
			</Link>
		</div>
	);
};

export default CommitCard;
