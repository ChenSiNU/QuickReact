import React, { useEffect, useState } from "react";
import TermCheckbox from "./TermCheckbox";
import CourseTimePicker from "./CourseTimePicker";
import { useDbUpdate } from "../Utils/firebase";
import "./CourseForm.css";

const CourseForm = ({ open, cancel, course, selected, setSelected }) => {
	const courseKey = `${course.term[0]}${course.number}`;
	const [update, res] = useDbUpdate(`/courses/${courseKey}`);

	const [title, setTitle] = useState(course.title);
	const [startHour, setStartHour] = useState(course.meets.startHour);
	const [startMin, setStartMin] = useState(course.meets.startMin);
	const [endHour, setEndHour] = useState(course.meets.endHour);
	const [endMin, setEndMin] = useState(course.meets.endMin);

	const regex = /^([a-zA-Z]+[1-9]*(\p{P})*\s*){2,}/;
	const [validTitle, setValidTitle] = useState(regex.test(title));
	const [validDate, setValidDate] = useState(true);
	const [validTime, setValidTime] = useState(true);

	const [dates, setDates] = useState({
		M: course.meets.dates.includes("M"),
		Tu: course.meets.dates.includes("Tu"),
		W: course.meets.dates.includes("W"),
		Th: course.meets.dates.includes("Th"),
		F: course.meets.dates.includes("F"),
	});

	const resetData = () => {
		setTitle(course.title);
		setDates({
			M: course.meets.dates.includes("M"),
			Tu: course.meets.dates.includes("Tu"),
			W: course.meets.dates.includes("W"),
			Th: course.meets.dates.includes("Th"),
			F: course.meets.dates.includes("F"),
		});
		setStartHour(course.meets.startHour);
		setStartMin(course.meets.startMin);
		setEndHour(course.meets.endHour);
		setEndMin(course.meets.endMin);
	};

	const submit = (e) => {
		// e.preventDefault();
		console.log("submit");

		const updatedMeets = `${Object.entries(dates).reduce(
			(str, [key, value]) => str + (value ? key : ""),
			""
		)} ${startHour}:${startMin}-${endHour}:${endMin}`;
		const updatedCourse = {
			...course,
			title: title,
			meets: updatedMeets,
		};
		// if (selected) {
		// 	setSelected(!selected);
		// }

		update(updatedCourse);
		// if (open) {
		// 	cancel();
		// }
	};

	const handleDatesChange = (date) => {
		setDates((prev) => ({
			...prev,
			[date]: !prev[date],
		}));
	};

	useEffect(() => {
		resetData();
	}, [course]);

	useEffect(() => {
		setValidTitle(regex.test(title));
	}, [title]);

	useEffect(() => {
		setValidDate(
			Object.entries(dates).reduce((n, [key, value]) => n + value, 0) > 0
		);
	}, [dates]);

	return open ? (
		<div
			className='course-form-wrapper'
			onClick={(e) => {
				if (e.target === e.currentTarget) cancel();
			}}
		>
			<div className='course-form-inner'>
				<form className='course-form'>
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
						{["M", "Tu", "W", "Th", "F"].map((s) => (
							<TermCheckbox
								key={s}
								label={s}
								checked={dates[s]}
								onChange={() => handleDatesChange(s)}
							/>
						))}
					</div>
					<div className='course-form-date-alert-message'>
						{validDate ? "" : "Course should have at least one date"}
					</div>

					<CourseTimePicker
						startHour={startHour}
						startMin={startMin}
						endHour={endHour}
						endMin={endMin}
						setStartHour={setStartHour}
						setStartMin={setStartMin}
						setEndHour={setEndHour}
						setEndMin={setEndMin}
						setValid={setValidTime}
					></CourseTimePicker>

					<div className='button-row'>
						<button
							type='submit'
							className={
								validTitle && validDate && validTime
									? "course-form-submit-button"
									: "course-form-submit-button-nonvalid"
							}
							disabled={!(validTitle && validDate && validTime)}
							onClick={submit}
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
