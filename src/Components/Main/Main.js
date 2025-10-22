import React, { useState, useEffect } from "react";
import { getAllClasses } from "../../Common/Services/ClassService";
import { getAllStudents } from "../../Common/Services/StudentService";
import MainList from "./MainList";
// import useFetch from "../../Common/Services/useFetch.js";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const Main = () => {
  // const data = useFetch("https://jsonplaceholder.typicode.com/todos/");
  // console.log("data: ", data);
  // Variables in the state to hold data
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  // UseEffect to run when the page loads to
  // obtain async data and render
  useEffect(() => {
    getAllClasses().then((classData) => {
      console.log("Classes: ", classData);
      setClasses(classData);
    });

    getAllStudents().then((studentData) => {
      console.log("Students: ", studentData);
      setStudents(studentData);
    });
  }, []);

  return (
    <div>
      This is the main stateful parent component.
      <MainList classes={classes} students={students} />
    </div>
  );
};

export default Main;
