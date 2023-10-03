import React, { useEffect, useState } from "react";
import TermCheckbox from "./TermCheckbox";
import CourseTimePicker from "./CourseTimePicker";
import "./CourseForm.css";

const CourseForm = ({ open, cancel, course }) => {
	const [formData, setFormData] = useState(course);

	const [title, setTitle] = useState(course.title);
	const regex = /^([a-zA-Z]+[1-9]*(\p{P})*\s*){2,}/;
	const [validTitle, setValidTitle] = useState(regex.test(title));

	const [validTime, setValidTime] = useState(true);

	const [dates, setDates] = useState({
		Mon: course.meets.dates.includes("M"),
		Tue: course.meets.dates.includes("Tu"),
		Wed: course.meets.dates.includes("W"),
		Thur: course.meets.dates.includes("Th"),
		Fri: course.meets.dates.includes("F"),
	});

	const resetData = () => {
		setTitle(course.title);
		setDates({
			Mon: course.meets.dates.includes("M"),
			Tue: course.meets.dates.includes("Tu"),
			Wed: course.meets.dates.includes("W"),
			Thur: course.meets.dates.includes("Th"),
			Fri: course.meets.dates.includes("F"),
		});
	};

	const submit = () => {
		console.log("submit");
	};

	const handleDatesChange = (date) => {
		setDates((prev) => ({
			...prev,
			[date]: !prev[date],
		}));
	};

	const handleSelectTime = (time) => {
		setTime(time);
	};

	useEffect(() => {
		setValidTitle(regex.test(title));
	}, [title]);

	return open ? (
		<div
			className='course-form-wrapper'
			onClick={(e) => {
				if (e.target === e.currentTarget) cancel();
			}}
		>
			<div className='course-form-inner'>
				<form className='course-form' onSubmit={submit} noValidate>
					<div className='course-form-input-label'>Title</div>
					<input
						className={
							validTitle ? "course-form-input" : "course-form-input-nonvalid"
						}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className='course-form-title-alert-message'>
						{validTitle ? "" : "Title needs to be at lease two letters"}
					</div>

					<div className='course-form-input-label'>Meets</div>
					<div className='course-form-date-checkbox-wrapper'>
						{["Mon", "Tue", "Wed", "Thur", "Fri"].map((s) => (
							<TermCheckbox
								key={s}
								label={s}
								checked={dates[s]}
								onChange={() => handleDatesChange(s)}
							/>
						))}
					</div>

					<CourseTimePicker
						startHour={course.meets.startHour}
						startMin={course.meets.startMin}
						endHour={course.meets.endHour}
						endMin={course.meets.endMin}
						setValid={setValidTime}
					></CourseTimePicker>

					<div className='button-row'>
						<button
							type='submit'
							className={
								validTitle && validTime
									? "course-form-submit-button"
									: "course-form-submit-button-nonvalid"
							}
							disabled={!(validTitle && validTime)}
						>
							Submit
						</button>
						<button
							type='button'
							className='course-form-cancel-button'
							onClick={() => {
								resetData();
								cancel();
							}}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	) : (
		""
	);
};

export default CourseForm;
