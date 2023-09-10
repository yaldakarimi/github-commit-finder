import React from "react";
interface Props {
	bgColor: string;
	children: React.ReactNode;
	customClasses?: string;
}
const Tag = ({ bgColor, children, customClasses }: Props) => {
	const classes = `${customClasses} ${bgColor}`;
	return (
		<div
			className={`flex gap-1 justify-center items-center rounded-full py-1 px-2 text-sm w-fit ${classes}`}
		>
			{children}
		</div>
	);
};

export default Tag;
