import { FaGithub } from "react-icons/fa";

const Header = () => {
	return (
		<div className="flex gap-4 p-6 shadow-md lightText bg-darkPurple ">
			<FaGithub className="text-3xl" />
			<h1 className="text-2xl font-bold">Github Commits Finder</h1>
		</div>
	);
};

export default Header;
