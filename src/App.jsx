import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import "./App.css";

const App = () => {
	const [schedule, setSchedule] = useState({});
	const fetchUrl =
		"https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php";
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(fetchUrl);
			const data = await response.json();
			setSchedule(data);
			setLoading(false);
		};

		fetchData();
	}, []);

	if (loading) {
		return <h1>Wait for Loading</h1>;
	}

	return (
		<div className='App'>
			<Banner title={schedule.title} />
			<CourseList courses={schedule.courses} />
		</div>
	);
};

export default App;
