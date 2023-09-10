export interface ServerResponse<T> {
	status: Number;
	error: any;
	isLoading: Boolean;
	fetchError: string | null;
	data: T | null | undefined;
}

// TODO: @Reviewers, I included index signatures in certain interfaces to prioritize project-specific data.
export interface Author {
	avatar_url: string;
	id: number;
	[x: string | number | symbol]: any;
}

export interface Commit {
	author: Author;
	commit: {
		author: {
			date: string;
			email: string;
			name: string;
		};
		message: string;
	};
	message: string;
	sha: string;
	files: Array<CommitFile>;
	stats: {
		additions: number;
		deletions: number;
		total: number;
	};
}

export interface CommitFile {
	additions: number;
	changes: number;
	deletions: number;
	filename: string;
	status: string;
}

export interface CommitListItem {
	author: Author;
	commit: Commit;
	[x: string | number | symbol]: any;
}

export interface SampleOwnerAndRepo {
	sampleOwner: string;
	sampleRepo: string;
}
