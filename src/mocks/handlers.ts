import { rest } from "msw";

export const handlers = [
	rest.get(
		"https://api.github.com/repos/:owner/:repo/commits",
		(req, res, ctx) => {
			return (
				res(ctx.status(200)),
				res(
					ctx.json([
						{
							sha: "123456",
							commit: {
								author: { name: "Josh Story", date: "2023-09-07T21:48:22Z" },
								message: "Fix UI issues",
							},
						},

						{
							sha: "123456",
							commit: {
								author: { name: "Jack Smith", date: "2023-05-07T21:48:22Z" },
								message: "Fix the bug",
							},
						},
					])
				)
			);
		}
	),
];
