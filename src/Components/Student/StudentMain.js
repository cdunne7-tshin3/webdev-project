import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllStudents,
  getStudentsByClass,
  createStudent,
  updateStudent,
  removeStudent,
} from "../../Common/Services/StudentService";
import { getAllClasses } from "../../Common/Services/ClassService";
import StudentList from "./StudentList";

const StudentMain = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
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
  }, [classId]);

  useEffect(() => {
    fetchData();
  }, [classId, fetchData]);

  const handleCreateStudent = async (first, last, email, selectedClassId) => {
    try {
      await createStudent(first, last, email, selectedClassId);
      await fetchData();
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create student");
    }
  };

  const handleEditStudent = async (id, first, last, email, classId) => {
    try {
      await updateStudent(id, first, last, email, classId);
      await fetchData();
    } catch (error) {
      console.error("Error editing student:", error);
      alert("Failed to edit student");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to remove this student from all students?")) return;

    try {
      await removeStudent(id);
      await fetchData();
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student");
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
      onEditStudent={handleEditStudent}
      onDeleteStudent={handleDeleteStudent}
    />
  );
};


export default StudentMain;
