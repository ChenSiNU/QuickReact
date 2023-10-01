import React, { useState } from "react";
import TermCheckbox from "./TermCheckbox";
import "./CourseForm.css";

const CourseForm = ({ open, cancel, course }) => {
	const [formData, setFormData] = useState(course);

	const [title, setTitle] = useState(course.title);
	const [dates, setDates] = useState({
		Mon: course.meets.dates.includes("M"),
		Tue: course.meets.dates.includes("Tu"),
		Wed: course.meets.dates.includes("W"),
		Thur: course.meets.dates.includes("Th"),
		Fri: course.meets.dates.includes("F"),
	});

	// console.log(title);
	// console.log(dates);

	const submit = () => {
		console.log("submit");
	};

	const handleDatesChange = (date) => {
		setDates((prev) => ({
			...prev,
			[date]: !prev[date],
		}));
	};

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
						className='course-form-input'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<div className='course-form-input-label'>Meets</div>
					<div>
						{["Mon", "Tue", "Wed", "Thur", "Fri"].map((s) => (
							<TermCheckbox
								key={s}
								label={s}
								checked={dates[s]}
								onChange={() => handleDatesChange(s)}
							/>
						))}
					</div>

					<div className='button-row'>
						<button
							type='submit'
							className='course-form-submit-button'
							disabled={true}
						>
							Submit
						</button>
						<button
							type='button'
							className='course-form-cancel-button'
							onClick={cancel}
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
