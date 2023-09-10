import { Tag } from "components/common";
import { FaPlus, FaMinus } from "react-icons/fa";

interface Props {
	filename: string;
	status: string;
	additions: Number;
	deletions: Number;
}

const ADD_BG_COLOR = "bg-green-600";
const ADD_TEXT_COLOR = "text-white";
const ADD_BORDER_COLOR = "border-green-600";

const REMOVE_BG_COLOR = "bg-red-600";
const REMOVE_TEXT_COLOR = "text-white";
const REMOVE_BORDER_COLOR = "border-red-600";

const MODIFY_BG_COLOR = "bg-yellow-600";
const MODIFY_TEXT_COLOR = "text-white";
const MODIFY_BORDER_COLOR = "border-yellow-600";

const DEFAULT_BG_COLOR = "bg-primary";
const DEFAULT_TEXT_COLOR = "text-white";
const DEFAULT_BORDER_COLOR = "border-primary";

const FileCard = ({ filename, status, additions, deletions }: Props) => {
	let textColor = "";
	let backgroundColor = "";
	let borderColor = "";

	switch (status) {
		case "added":
			backgroundColor = ADD_BG_COLOR;
			textColor = ADD_TEXT_COLOR;
			borderColor = ADD_BORDER_COLOR;
			break;

		case "removed":
			backgroundColor = REMOVE_BG_COLOR;
			textColor = REMOVE_TEXT_COLOR;
			borderColor = REMOVE_BORDER_COLOR;
			break;

		case "modified":
			backgroundColor = MODIFY_BG_COLOR;
			textColor = MODIFY_TEXT_COLOR;
			borderColor = MODIFY_BORDER_COLOR;
			break;
		default:
			backgroundColor = DEFAULT_BG_COLOR;
			textColor = DEFAULT_TEXT_COLOR;
			borderColor = DEFAULT_BORDER_COLOR;
			break;
	}
	return (
		<div className={`card ${borderColor}  lg:w-96 border-2 `}>
			<span className="text-sm mb-2 inline-block break-all	">
				File name: {filename}
			</span>

			<div className="flex gap-2">
				<Tag bgColor={ADD_BG_COLOR} customClasses="w-12">
					<FaPlus className={ADD_TEXT_COLOR} />
					<span className={`${ADD_TEXT_COLOR}`}>{additions.toString()}</span>
				</Tag>

				<Tag bgColor={REMOVE_BG_COLOR} customClasses="w-12">
					<FaMinus className={REMOVE_TEXT_COLOR} />
					<span className={`${REMOVE_TEXT_COLOR}`}>{deletions.toString()}</span>
				</Tag>

				<Tag bgColor={backgroundColor}>
					<span className={textColor}>{status}</span>
				</Tag>
			</div>
		</div>
	);
};

export default FileCard;
