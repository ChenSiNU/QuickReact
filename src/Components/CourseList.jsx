import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import TermCheckbox from "./TermCheckbox";
import PopUp from "./PopUp";
import "./CourseList.css";

const CourseList = ({ courses }) => {
	const [displayedCourse, setDisplayedCourse] = useState([]);
	const [displayedTerm, setDisplayedTerm] = useState("Fall");

	const [selectedCourses, setSelectedCourses] = useState([]);

	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	const handleTermChange = (term) => {
		setDisplayedTerm(term);
	};

	const coursesEquals = (c1, c2) =>
		c1.term === c2.term && c1.number === c2.number && c1.title === c2.title;

	const selectedCoursesIncludes = (course) =>
		selectedCourses.filter((c) => coursesEquals(c, course)).length !== 0;

	const handleCourseOnClick = (course) =>
		selectedCoursesIncludes(course)
			? setSelectedCourses(
					selectedCourses.filter((c) => !coursesEquals(c, course))
			  )
			: setSelectedCourses([...selectedCourses, course]);

	useEffect(() => {
		const tempCourses = Object.entries(courses)
			.filter(([key, value]) => value.term === displayedTerm)
			.map(([key, value]) => value);
		setDisplayedCourse(tempCourses);
	}, [displayedTerm]);

	return (
		<div>
			<PopUp
				open={open}
				close={closeModal}
				selectedCourses={selectedCourses}
				displayedTerm={displayedTerm}
			></PopUp>

			<div className='header-box'>
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
				<button className='popup-open-button' onClick={openModal}>
					Schedule
				</button>
			</div>

			<div className='course-list'>
				{displayedCourse.map((course) => {
					return (
						<CourseCard
							key={`${course.term}${course.number}${course.title}`}
							value={course}
							initSelected={selectedCoursesIncludes(course)}
							onClick={handleCourseOnClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CourseList;
