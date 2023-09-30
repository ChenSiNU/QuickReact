import "./CourseCard.css";
import Card from "react-bootstrap/Card";

import React, { useState } from "react";

const CourseCard = ({ value, onClick, initSelected, conflicted }) => {
	const [selected, setSelected] = useState(initSelected);

	return (
		<Card
			className={
				conflicted
					? "course-card-conflicted"
					: selected
					? "course-card-selected"
					: "course-card"
			}
			selected={selected}
			onClick={
				conflicted
					? () => {}
					: () => {
							setSelected(!selected);
							onClick(value);
					  }
			}
		>
			<Card.Body className='course-card-body-top'>
				<Card.Title className='course-card-number'>
					{"CS " + value.number}
				</Card.Title>
				<Card.Text className='course-card-title'>{value.title}</Card.Text>
			</Card.Body>

			<Card.Body className='course-card-body-bottom'>
				<hr />
				<Card.Body>{value.meets}</Card.Body>
			</Card.Body>
		</Card>
	);
};

export default CourseCard;
