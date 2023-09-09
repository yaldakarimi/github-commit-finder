import {Card} from "components/common"
import { TbFaceIdError } from "react-icons/tb";

interface Props {
	error?: string;
}
const CustomError = ({ error }: Props) => {
	return (
		<Card customClasses="bg-darkPurple flex flex-col gap-4 justify-center items-center">
			<TbFaceIdError className="text-6xl text-red-500" />
			<div className="text-center text-slate-200">
				<p>{error}</p>
				<p>Unfortunately, something went wrong, please try again! </p>
			</div>
		</Card>
	);
};

export default CustomError;
