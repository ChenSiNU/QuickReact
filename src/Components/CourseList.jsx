import React from "react";
import CourseCard from "./CourseCard";
import "./CourseList.css";

const CourseList = (props) => {
  const courses = props.courses;

  return (
    <div className="course-list">
      {Object.entries(courses).map(([key, value]) => (
        <CourseCard value={value}></CourseCard>
      ))}
    </div>
  );
};

export default CourseList;
