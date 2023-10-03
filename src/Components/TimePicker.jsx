import React, { useEffect, useState } from "react";
import "./TimePicker.css";

const TimePicker = ({
	hour,
	min,
	hourOnChange,
	minOnChange,
	label,
	validTime,
}) => {
	const hours = Array.from({ length: 24 }, (_, i) =>
		i < 10 ? `0${i}` : `${i}`
	);
	const minutes = Array.from({ length: 12 }, (_, i) =>
		i < 2 ? `0${5 * i}` : `${5 * i}`
	);

	const [selectedHour, setSelectedHour] = useState(hour);
	const [selectedMin, setSelectedMinute] = useState(min);

	const handleHourChange = (event) => {
		setSelectedHour(event.target.value);
	};

	const handleMinChange = (event) => {
		setSelectedMinute(event.target.value);
	};

	useEffect(() => {
		hourOnChange(selectedHour);
		minOnChange(selectedMin);
	}, [selectedHour, selectedMin]);

	return (
		<div className='time-picker-wrapper'>
			<span
				className={
					validTime ? "time-picker-label" : "time-picker-label-nonvalid"
				}
			>
				{label}:
			</span>
			<select value={selectedHour} onChange={handleHourChange}>
				{hours.map((h) => (
					<option key={h} value={h}>
						{h}
					</option>
				))}
			</select>
			:
			<select value={selectedMin} onChange={handleMinChange}>
				{minutes.map((m) => (
					<option key={m} value={m}>
						{m}
					</option>
				))}
			</select>
		</div>
	);
};

export default TimePicker;
