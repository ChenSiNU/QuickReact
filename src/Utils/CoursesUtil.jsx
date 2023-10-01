export const coursesEquals = (c1, c2) =>
	c1.term === c2.term && c1.number === c2.number && c1.title === c2.title;

export const parseStrToTime = (str) => {
	const [date, tStr] = str.split(" ");
	const [sStr, eStr] = tStr.split("-");
	const start = sStr.split(":");
	const end = eStr.split(":");

	const regex = /[A-Z][a-z]*/g;

	return {
		dates: date.match(regex),
		startHour: start[0],
		startMin: start[1],
		endHour: end[0],
		endMin: end[1],
	};
};

const compareTime = (t1, t2) => {
	if (!t1.dates.some((date) => t2.dates.includes(date))) {
		return false;
	}
	const start1 = parseInt(t1.startHour) * 60 + parseInt(t1.startMin);
	const end1 = parseInt(t1.endHour) * 60 + parseInt(t1.endMin);
	const start2 = parseInt(t2.startHour) * 60 + parseInt(t2.startMin);
	const end2 = parseInt(t2.endHour) * 60 + parseInt(t2.endMin);
	return (
		(end1 >= start2 && start2 >= start1) || (end2 >= start1 && start1 >= start2)
	);
};

export const getConflictedCourses = (selectedCourses, notSelectedCourses) =>
	notSelectedCourses.filter((c) =>
		selectedCourses.some(
			(course) => course.term === c.term && compareTime(course.meets, c.meets)
		)
	);
