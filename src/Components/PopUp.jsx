import React from "react";
import "./PopUp.css";

const PopUp = ({ open, close, selectedCourses, displayedTerm }) => {
	const coursesInCart = selectedCourses.filter(
		(course) => course.term === displayedTerm
	);

	return open ? (
		<div
			className='popup'
			onClick={(e) => {
				if (e.target === e.currentTarget) close();
			}}
		>
			<div className='popup-inner'>
				<div className='popup-term'>{displayedTerm}</div>
				<div className='course-cart'>
					<hr></hr>
					{coursesInCart.length !== 0 ? (
						coursesInCart.map((course) => (
							<div key={`${course.term}${course.number}${course.title}`}>
								<div>CS {course.number}</div>
								<div>{course.title}</div>
								<div>
									<span>{`${course.meets.dates} ${course.meets.startHour}:${course.meets.startMin} ~ ${course.meets.endHour}:${course.meets.endMin}`}</span>
								</div>
								<hr></hr>
							</div>
						))
					) : (
						<div>
							No courses selected for this term, click to add it to cart
						</div>
					)}
				</div>
				<button className='popup-close-button' onClick={close}>
					Close
				</button>
			</div>
		</div>
	) : (
		""
	);
};

export default PopUp;
