import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import TermCheckbox from "./TermCheckbox";
import PopUp from "./PopUp";
import { coursesEquals, getConflictedCourses } from "../Utils/CoursesUtil";

import "./CourseList.css";

const CourseList = ({ courses }) => {
	const [displayedCourse, setDisplayedCourse] = useState([]);
	const [displayedTerm, setDisplayedTerm] = useState("Fall");

	const [selectedCourses, setSelectedCourses] = useState([]);
	const selectedCoursesIncludes = (course) =>
		selectedCourses.filter((c) => coursesEquals(c, course)).length !== 0;

	const notSelectedCourses = courses.filter(
		(course) => !selectedCoursesIncludes(course)
	);
	const [conflictedCourses, setConflictedCourses] = useState([]);

	const [open, setOpen] = useState(false);

	const openModal = () => setOpen(true);
	const closeModal = () => setOpen(false);

	const handleTermChange = (term) => {
		setDisplayedTerm(term);
	};

	const conflictedCoursesIncludes = (course) =>
		conflictedCourses.filter((c) => coursesEquals(c, course)).length !== 0;

	const handleCourseOnClick = (course) =>
		selectedCoursesIncludes(course)
			? setSelectedCourses(
					selectedCourses.filter((c) => !coursesEquals(c, course))
			  )
			: setSelectedCourses([...selectedCourses, course]);

	useEffect(() => {
		const tempCourses = courses.filter(
			(course) => course.term === displayedTerm
		);
		setDisplayedCourse(tempCourses);
	}, [displayedTerm]);

	useEffect(() => {
		const tempCourses = getConflictedCourses(
			selectedCourses,
			notSelectedCourses
		);
		setConflictedCourses(tempCourses);
	}, [selectedCourses]);

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
							conflicted={conflictedCoursesIncludes(course)}
							onClick={handleCourseOnClick}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CourseList;
