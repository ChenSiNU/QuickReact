import React, { useEffect, useState } from "react";
import TimePicker from "./TimePicker";
import "./CourseTimePicker.css";

const CourseTimePicker = ({
	startHour,
	startMin,
	endHour,
	endMin,
	setStartHour,
	setStartMin,
	setEndHour,
	setEndMin,
	setValid,
}) => {
	const [sHour, setSHour] = useState(startHour);
	const [sMin, setSMin] = useState(startMin);
	const [eHour, setEHour] = useState(endHour);
	const [eMin, setEMin] = useState(endMin);

	const [validTime, setValidTime] = useState(true);

	const checkTimeValid = (h1, m1, h2, m2) => {
		if (h1 < h2) return true;
		if (h1 === h2) return m1 < m2;
		return false;
	};

	useEffect(() => {
		setStartHour(sHour);
		setStartMin(sMin);
		setEndHour(eHour);
		setEndMin(eMin);
		const v = checkTimeValid(sHour, sMin, eHour, eMin);
		setValidTime(v);
		setValid(v);
	}, [sHour, sMin, eHour, eMin]);

	return (
		<div className='course-time-picker-wrapper'>
			<TimePicker
				hour={sHour}
				min={sMin}
				hourOnChange={setSHour}
				minOnChange={setSMin}
				validTime={validTime}
				label='Start Time'
			></TimePicker>
			<TimePicker
				hour={eHour}
				min={eMin}
				hourOnChange={setEHour}
				minOnChange={setEMin}
				validTime={validTime}
				label='End Time'
			></TimePicker>
			<div className='course-time-picker-alert-message'>
				{validTime ? "" : "Please choose a valid time range"}
			</div>
		</div>
	);
};

export default CourseTimePicker;
