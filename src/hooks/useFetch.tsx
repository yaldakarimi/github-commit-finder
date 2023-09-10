import { useEffect, useState } from "react";
import { ServerResponse } from "app/types/common";

// TODO @Reviewers: Created a custom hook for potential scalability, even though it's currently used only once.

const useFetch = <T,>(url: string): ServerResponse<T> => {
	const [status, setStatus] = useState<number>(0);
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [fetchError, setFetchError] = useState<string | null>(null);

	const getData = async () => {
		setIsLoading(true);
		try {
			const res = await fetch(url, {
				// TODO @Reviewers: add your own token
				// headers: { Authorization: "" },
			});
			const responseData = await res.json();
			if (res.ok) {
				setData(responseData);
			} else {
				setStatus(res.status);
				setFetchError(
					responseData.message || "An error occurred during the request"
				);
			}
		} catch (err) {
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!!data) {
			return;
		}
		getData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);

	return { status, isLoading, data, error, fetchError };
};

export default useFetch;
