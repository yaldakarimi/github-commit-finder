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
		<div data-testid="commitItem" className=" mb-4 p-4 rounded-md shadow-md cursor-pointer bg-darkPurple lightText  hover:transform hover:scale-95 transition-transform duration-300">
			<Link to={`/commit/${owner}/${repo}/${sha}`}>
				<div className="mb-2">
					<span className="text-sm textYellow">Owner: </span>
					<span>{commit.author.name}</span>
				</div>
				<div className="mb-2">
					<span className="text-sm textYellow">Message: </span>
					<span className="truncatedText">{commit.message}</span>
				</div>
				<div className="mb-2">
					<span className="text-sm textYellow">Date: </span>
					{formatDate(commit.author.date)}
				</div>
				<div className="flex items-center justify-end gap-2">
					<span className="textYellow text-sm"> See more details</span>
					<FaArrowRight className="textYellow" />
				</div>
			</Link>
		</div>
	);
};

export default CommitCard;
