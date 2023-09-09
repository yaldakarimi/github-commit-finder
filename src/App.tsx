import HomePage from "views/HomePage";
import { Routes, Route } from "react-router-dom";
import DetailPage from "views/DetailPage";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/commit/:owner/:repo/:sha" element={<DetailPage />} />
				<Route path="/:owner?/:repo?" element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
