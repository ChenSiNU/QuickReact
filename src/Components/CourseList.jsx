import React from "react";
import "./CourseList.css";

const CourseList = (props) => {
  const courses = props.courses;

  return (
    <div className="CourseList">
      {Object.entries(courses).map(([key, value]) => (
        <div>
          <div>{value.term + " CS " + value.number + ": " + value.title}</div>
          <div>{"Meet: " + value.meets}</div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
