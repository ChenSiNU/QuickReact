import React from "react";
import CourseCard from "./CourseCard";
import "./CourseList.css";

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      {Object.entries(courses).map(([key, value]) => (
        <CourseCard value={value} />
      ))}
    </div>
  );
};

export default CourseList;
