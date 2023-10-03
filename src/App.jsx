import {
	useDbData,
	signInWithGoogle,
	firebaseSignOut,
	useAuthState,
} from "./Utils/firebase";
import Banner from "./Components/Banner";
import CourseList from "./Components/CourseList";
import { parseStrToTime } from "./Utils/CoursesUtil";
import "./App.css";

const App = () => {
	const [schedule, error] = useDbData("/");
	const [user] = useAuthState();

	if (error) return <h1>Error loading data: {error.toString()}</h1>;
	if (!schedule) {
		return <h1>Wait for Loading</h1>;
	}

	return (
		<div className='App'>
			{user ? (
				<div>
					{user.email}
					<button className='auth-button' onClick={firebaseSignOut}>
						Sign out
					</button>
				</div>
			) : (
				<button className='auth-button' onClick={signInWithGoogle}>
					Sign in
				</button>
			)}
			<Banner title={schedule.title} />
			<CourseList
				courses={Object.entries(schedule.courses)
					.map(([key, value]) => value)
					.map((course) => ({
						...course,
						meets: parseStrToTime(course.meets),
					}))}
			/>
		</div>
	);
};

export default App;
