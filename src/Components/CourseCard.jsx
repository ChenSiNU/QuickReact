import "./CourseCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import React, { useState } from "react";

const CourseCard = ({ value, onClick, initSelected }) => {
	const [selected, setSelected] = useState(initSelected);

	return (
		<Card
			className={selected ? "course-card-selected" : "course-card"}
			selected={selected}
			onClick={() => {
				setSelected(!selected);
				// console.log(value);
				onClick(value);
			}}
		>
			<Card.Body className='course-card-body-top'>
				<Card.Title className='course-card-number'>
					{value.term + " CS " + value.number}
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
