import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";

const firebaseConfig = {
	apiKey: "AIzaSyCGXgz2no37LUAZuuRkllVYPkxB6VKZgIg",
	authDomain: "cs392-quickreact.firebaseapp.com",
	databaseURL: "https://cs392-quickreact-default-rtdb.firebaseio.com",
	projectId: "cs392-quickreact",
	storageBucket: "cs392-quickreact.appspot.com",
	messagingSenderId: "905062299178",
	appId: "1:905062299178:web:08089fd3250fa87ed1f553",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const useDbData = (path) => {
	const [data, setData] = useState();
	const [error, setError] = useState(null);

	useEffect(
		() =>
			onValue(
				ref(database, path),
				(snapshot) => {
					setData(snapshot.val());
				},
				(error) => {
					setError(error);
				}
			),
		[path]
	);

	return [data, error];
};

const makeResult = (error) => {
	const timestamp = Date.now();
	const message =
		error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
	return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
	const [result, setResult] = useState();
	const updateData = useCallback(
		(value) => {
			update(ref(database, path), value)
				.then(() => setResult(makeResult()))
				.catch((error) => setResult(makeResult(error)));
		},
		[database, path]
	);

	return [updateData, result];
};
