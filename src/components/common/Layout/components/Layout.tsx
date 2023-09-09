import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";

interface Props {
	title: string;
	children: React.ReactNode;
}
const Layout = ({ title = "Github Viewer", children }: Props) => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			<Header />
			<Helmet>
				<title>{title}</title>
				<meta name="description" content="Nebenan Coding Task"></meta>
			</Helmet>

			<main className="flex-grow container p-4 mx-auto bg-white shadow-md md:my-8 md:rounded-md md:p-6 ">
				{children}
			</main>

			<Footer />
		</div>
	);
};

export default Layout;
