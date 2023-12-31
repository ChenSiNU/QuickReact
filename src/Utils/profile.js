import { useAuthState, useDbData } from "./firebase";

export const useProfile = () => {
	const [user] = useAuthState();
	const [isAdmin, isLoading, error] = useDbData(
		`/admins/${user?.uid || "guest"}`
	);
	// console.log(user?.uid || "guest", isAdmin);
	return [{ user, isAdmin }, isLoading, error];
};
