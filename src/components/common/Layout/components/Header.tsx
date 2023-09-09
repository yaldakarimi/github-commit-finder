import { FaGithub } from "react-icons/fa";

const Header = () => {
	return (
		<div className="flex gap-4 p-6 text-slate-100 bg-darkPurple  shadow-md">
			<FaGithub className="text-3xl" />
			<h1 className="text-2xl font-bold">Github Viewer Application</h1>
		</div>
	);
};

export default Header;
