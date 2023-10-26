import { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
	connectAuthEmulator,
	signInWithCredential,
} from "firebase/auth";
import {
	getDatabase,
	onValue,
	ref,
	update,
	connectDatabaseEmulator,
} from "firebase/database";

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
const auth = getAuth(firebase);
const database = getDatabase(firebase);

if (import.meta.env.NODE_ENV !== "production") {
	connectAuthEmulator(auth, "http://127.0.0.1:9099");
	connectDatabaseEmulator(database, "127.0.0.1", 9000);

	signInWithCredential(
		auth,
		GoogleAuthProvider.credential(
			'{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
		)
	);

	// set flag to avoid connecting twice, e.g., because of an editor hot-reload
	// windows.EMULATION = true;
}

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

export const signInWithGoogle = () => {
	signInWithPopup(auth, new GoogleAuthProvider());
};

export const firebaseSignOut = () => signOut(auth);

export const useAuthState = () => {
	const [user, setUser] = useState();

	useEffect(() => onAuthStateChanged(auth, setUser), []);

	return [user];
};
