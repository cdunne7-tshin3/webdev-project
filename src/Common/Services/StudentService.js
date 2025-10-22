import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Student with First, Last, and email (optional)
export const createStudent = (firstName, lastName, email = "", classId) => {
  console.log("Creating: ", firstName, lastName);
  const Student = Parse.Object.extend("Student");
  const student = new Student();
  // using setter to UPDATE the object
  student.set("firstName", firstName);
  student.set("lastName", lastName);
  student.set("email", email);

  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;
  student.set("Class", classObj);

  return student.save().then((result) => {
    // returns new Student object
    return result;
  });
};

// READ operation - get student by ID
export const getStudentById = (id) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  return query.get(id).then((result) => {
    // return Student object with objectId: id
    return result;
  });
};

// READ operation - get all Students
export const getAllStudents = () => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  query.include("Class");
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Student objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// READ operation - get Students by Class ID
export const getStudentsByClass = async (classId) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;
  query.equalTo("Class", classObj);
  return query.find();
};

// DELETE operation - remove student by ID
export const removeStudent = (id) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  return query.get(id).then((student) => {
    student.destroy();
  });
};
