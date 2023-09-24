import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import TermCheckbox from "./TermCheckbox";
import "./CourseList.css";

const CourseList = ({ courses }) => {
  const [displayedCourse, setDisplayedCourse] = useState([]);
  const [displayFall, setDisplayedFall] = useState(true);
  const [displayWinter, setDisplayedWinter] = useState(true);
  const [displaySpring, setDisplayedSpring] = useState(true);

  const handleChangeFall = () => {
    setDisplayedFall(!displayFall);
  };
  const handleChangeWinter = () => {
    setDisplayedWinter(!displayWinter);
  };
  const handleChangeSpring = () => {
    setDisplayedSpring(!displaySpring);
  };

  useEffect(() => {
    const tempCourses = Object.entries(courses)
      .filter(([key, value]) => {
        const term = value.term;
        if (term === "Fall") return displayFall;
        else if (term === "Spring") return displaySpring;
        else if (term === "Winter") return displayWinter;
        return false;
      })
      .map(([key, value]) => value);

    setDisplayedCourse(tempCourses);
  }, [displaySpring, displayFall, displayWinter]);

  return (
    <div>
      <div className="term-checkbox">
        <TermCheckbox
          label="Fall"
          checked={displayFall}
          onChange={handleChangeFall}
        />
        <TermCheckbox
          label="Winter"
          checked={displayWinter}
          onChange={handleChangeWinter}
        />
        <TermCheckbox
          label="Spring"
          checked={displaySpring}
          onChange={handleChangeSpring}
        />
      </div>
      <div className="course-list">
        {displayedCourse.map((course) => {
          return <CourseCard value={course} />;
        })}
      </div>
    </div>
  );
};

export default CourseList;
