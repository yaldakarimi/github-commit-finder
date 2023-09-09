import React from "react";

interface Props {
	children: React.ReactNode;
	customClasses?: string;
}

const Card = ({ children, customClasses }: Props) => {
	const classes = `card ${customClasses}`;
	return <div className={classes}>{children}</div>;
};

export default Card;
