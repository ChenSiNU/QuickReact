import "./CourseCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import React from "react";

const CourseCard = ({ value }) => {
  return (
    <Card className="course-card">
      <Card.Body className="course-card-body-top">
        <Card.Title className="course-card-number">
          {value.term + " CS " + value.number}
        </Card.Title>
        <Card.Text className="course-card-title">{value.title}</Card.Text>
      </Card.Body>

      <Card.Body className="course-card-body-bottom">
        <hr />
        <Card.Body>{value.meets}</Card.Body>
      </Card.Body>
    </Card>
  );
};

export default CourseCard;
