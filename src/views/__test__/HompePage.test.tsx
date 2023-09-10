import HomePage from "views/HomePage";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "app/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// TODO: @Reviewers Below I only added a few sample tests since I had limited time to finish the task/

const MOCK_HOMEPAGE = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<HomePage />
			</BrowserRouter>
		</Provider>
	);
};

describe("HomePage", () => {
	test("user sees search inputs, search and clear buttons, and empty state when enters the app", () => {
		render(<MOCK_HOMEPAGE />);
		const userInput = screen.getByRole("textbox", { name: /owner:/i });
		const repoInput = screen.getByRole("textbox", {
			name: /repository:/i,
		});
		const searchButton = screen.getByRole("button");
		const clearButton = screen.getByTestId("clearBtn");
		const emptyStateText = screen.getByText(
			/start the search to see the list of commits of a user!/i
		);

		const sampleQueries = screen.queryAllByTestId("sampleSearchQueries");
		expect(sampleQueries.length).toBe(4);

		expect(userInput).toBeInTheDocument();
		expect(repoInput).toBeInTheDocument();
		expect(searchButton).toBeInTheDocument();
		expect(clearButton).toBeInTheDocument();
		expect(emptyStateText).toBeInTheDocument();
	});

	test("user receives an error if he/she clicks on search without filling in the inputs", async () => {
		render(<MOCK_HOMEPAGE />);
		const searchButton = screen.getByRole("button");
		userEvent.click(searchButton);
		await waitFor(() => {
			expect(screen.getByText(/search fields cannot be empty/i)).toBeInTheDocument();
		});
	});

	test("search functionality works properly and users can see the commit items", async () => {
		render(<MOCK_HOMEPAGE />);
		const userInput = screen.getByRole("textbox", { name: /owner:/i });
		userEvent.clear(userInput);
		userEvent.type(userInput, "facebook");
		const repoInput = screen.getByRole("textbox", { name: /repository:/i });
		await waitFor(() => {
			expect(userInput).toHaveValue("facebook");
		});
		userEvent.clear(repoInput);
		userEvent.type(repoInput, "react");
		await waitFor(() => {
			expect(repoInput).toHaveValue("react");
		});
		const searchButton = screen.getByRole("button");
		userEvent.click(searchButton);
		const commits = await screen.findAllByTestId("commitItem");
		expect(commits.length).toEqual(2);
	});
});
