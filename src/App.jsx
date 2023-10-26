import { useDbData, signInWithGoogle, firebaseSignOut } from "./Utils/firebase";
import Banner from "./Components/Banner";
import CourseList from "./Components/CourseList";
import { parseStrToTime } from "./Utils/CoursesUtil";
import { useProfile } from "./Utils/profile";
import "./App.css";

const App = () => {
	const [schedule, error] = useDbData("/");
	const [{ user, isAdmin }, loading, e] = useProfile();

	console.log(user);

	if (error) return <h1>Error loading data: {error.toString()}</h1>;
	if (!schedule || loading) return <h1>Wait for Loading</h1>;

	return (
		<div className='App'>
			<Banner title={schedule.title} />
			{user ? (
				<div>
					{user.email}
					<button className='auth-button' onClick={firebaseSignOut}>
						Sign out
					</button>
					<CourseList
						courses={Object.entries(schedule.courses)
							.map(([key, value]) => value)
							.map((course) => ({
								...course,
								meets: parseStrToTime(course.meets),
							}))}
					/>
				</div>
			) : (
				<button className='auth-button-sign-in' onClick={signInWithGoogle}>
					Sign in
				</button>
			)}
		</div>
	);
};

export default App;
