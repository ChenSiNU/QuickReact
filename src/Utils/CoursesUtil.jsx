export const coursesEquals = (c1, c2) =>
	c1.term === c2.term && c1.number === c2.number && c1.title === c2.title;

const parseStrToTime = (str) => {
	const [date, tStr] = str.split(" ");
	const [sStr, eStr] = tStr.split("-");
	const start = sStr.split(":");
	const end = eStr.split(":");

	const regex = /[A-Z][a-z]*/g;

	return {
		date: date.match(regex),
		start: parseInt(start[0]) * 60 + parseInt(start[1]),
		end: parseInt(end[0]) * 60 + parseInt(end[1]),
	};
};

const compareTime = (s1, s2) => {
	const t1 = parseStrToTime(s1);
	const t2 = parseStrToTime(s2);

	if (!t1.date.some((date) => t2.date.includes(date))) {
		return false;
	}
	return (
		(t1.end >= t2.start && t2.start >= t1.start) ||
		(t2.end >= t1.start && t1.start >= t2.start)
	);
};

export const getConflictedCourses = (selectedCourses, notSelectedCourses) =>
	notSelectedCourses.filter((c) =>
		selectedCourses.some(
			(course) => course.term === c.term && compareTime(course.meets, c.meets)
		)
	);
