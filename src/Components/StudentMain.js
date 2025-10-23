import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllStudents,
  getStudentsByClass,
  createStudent,
} from "../Common/StudentService";
import { getAllClasses } from "../Common/ClassService";
import StudentList from "./StudentList";

const StudentMain = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [classId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const classResults = await getAllClasses();
      setClasses(classResults || []);

      let studentResults;
      if (classId) {
        studentResults = await getStudentsByClass(classId);
      } else {
        studentResults = await getAllStudents();
      }
      setStudents(studentResults || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = async (first, last, email, selectedClassId) => {
    try {
      await createStudent(first, last, email, selectedClassId);
      await fetchData();
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create student");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading students...</div>;
  }

  return (
    <StudentList
      students={students}
      classes={classes}
      classId={classId}
      onCreateStudent={handleCreateStudent}
    />
  );
};

export default StudentMain;
