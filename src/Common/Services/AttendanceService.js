// src/Common/Services/AttendanceService.js
import Parse from "parse";

// Create attendance record
export const createAttendance = (studentId, classId, date, status = "present") => {
  console.log("Creating attendance record:", studentId, classId, date, status);
  
  const Attendance = Parse.Object.extend("Attendance");
  const attendance = new Attendance();
  
  // Set student pointer
  const Student = Parse.Object.extend("Student");
  const student = new Student();
  student.id = studentId;
  attendance.set("Student", student);
  
  // Set class pointer
  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;
  attendance.set("Class", classObj);
  
  attendance.set("date", new Date(date));
  attendance.set("status", status);
  
  return attendance.save().then((result) => {
    return result;
  });
};

// Get all attendance records for a specific class session (by date and classId)
export const getAttendanceByClassAndDate = (classId, date) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  
  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;
  query.equalTo("Class", classObj);
  
  // Match the specific date
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  
  query.greaterThanOrEqualTo("date", startOfDay);
  query.lessThanOrEqualTo("date", endOfDay);
  query.include("Student");
  query.include("Class");
  
  return query.find();
};

// Get all attendance records for a specific student
export const getAttendanceByStudent = (studentId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  
  const Student = Parse.Object.extend("Student");
  const student = new Student();
  student.id = studentId;
  query.equalTo("Student", student);
  query.include("Class");
  query.descending("date");
  
  return query.find();
};

// Get all missed classes (absent or excused) for a student
export const getMissedClassesByStudent = (studentId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  
  const Student = Parse.Object.extend("Student");
  const student = new Student();
  student.id = studentId;
  query.equalTo("Student", student);
  query.containedIn("status", ["absent", "excused"]);
  query.include("Class");
  query.descending("date");
  
  return query.find();
};

// Get all absences for a specific class
export const getAbsencesByClass = (classId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  
  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;
  query.equalTo("Class", classObj);
  query.containedIn("status", ["absent", "excused"]);
  query.include("Student");
  query.descending("date");
  
  return query.find();
};

// Update attendance status
export const updateAttendanceStatus = (attendanceId, newStatus) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  
  return query.get(attendanceId).then((attendance) => {
    attendance.set("status", newStatus);
    return attendance.save();
  });
};

// Delete attendance record
export const deleteAttendance = (attendanceId) => {
  const Attendance = Parse.Object.extend("Attendance");
  const query = new Parse.Query(Attendance);
  
  return query.get(attendanceId).then((attendance) => {
    return attendance.destroy();
  });
};

// Bulk create attendance for all students in a class
export const bulkCreateAttendance = async (classId, date, studentStatusMap) => {
  // studentStatusMap is an object like: { studentId: "present", studentId2: "absent" }
  const promises = Object.entries(studentStatusMap).map(([studentId, status]) => {
    return createAttendance(studentId, classId, date, status);
  });
  
  return Promise.all(promises);
};