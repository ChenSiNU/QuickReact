import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import TermCheckbox from "./TermCheckbox";
import "./CourseList.css";

const CourseList = ({ courses }) => {
	const [displayedCourse, setDisplayedCourse] = useState([]);
	const [displayedTerm, setDisplayedTerm] = useState("Fall");

	const [selectedCourses, setSelectedCourses] = useState([]);

	const handleTermChange = (term) => {
		// setSelectedCourses([]);
		setDisplayedTerm(term);
	};

	const handleCourseOnClick = (courseInfo) => {
		selectedCourses.includes(courseInfo)
			? setSelectedCourses(
					selectedCourses.filter((info) => info !== courseInfo)
			  )
			: setSelectedCourses([...selectedCourses, courseInfo]);
	};

	useEffect(() => {
		const tempCourses = Object.entries(courses)
			.filter(([key, value]) => value.term === displayedTerm)
			.map(([key, value]) => value);

		console.log(tempCourses);
		setDisplayedCourse(tempCourses);
	}, [displayedTerm]);

	return (
		<div>
			<div className='term-checkbox'>
				<TermCheckbox
					label='Fall'
					checked={displayedTerm === "Fall"}
					onChange={handleTermChange}
				/>
				<TermCheckbox
					label='Winter'
					checked={displayedTerm === "Winter"}
					onChange={handleTermChange}
				/>
				<TermCheckbox
					label='Spring'
					checked={displayedTerm === "Spring"}
					onChange={handleTermChange}
				/>
			</div>
			<div className='course-list'>
				{displayedCourse.map((course) => {
					return (
						<CourseCard
							key={`${course.term}${course.number}${course.title}`}
							value={course}
							initSelected={selectedCourses.includes(
								`${course.term}${course.number}${course.title}`
							)}
							onClick={handleCourseOnClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CourseList;
