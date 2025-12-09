import Parse from "parse";

export const createStudent = (firstName, lastName, email = "", classId) => {
  console.log("Creating: ", firstName, lastName);
  const Student = Parse.Object.extend("Student");
  const student = new Student();
  student.set("firstName", firstName);
  student.set("lastName", lastName);
  student.set("email", email);

  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;
  student.set("Class", classObj);

  return student.save().then((result) => {
    return result;
  });
};

export const getStudentById = (id) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  return query.get(id).then((result) => {
    return result;
  });
};

export const getAllStudents = () => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  query.include("Class");
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

export const getStudentsByClass = async (classId) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);

  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.id = classId;

  query.equalTo("Class", classObj);
  return query.find();
};

export const removeStudent = (id) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);
  return query.get(id).then((student) => {
    student.destroy();
  });
};

export const updateStudent = async (id, firstName, lastName, email, classId) => {
  const Student = Parse.Object.extend("Student");
  const query = new Parse.Query(Student);

  try {
    const student = await query.get(id);

    student.set("firstName", firstName);
    student.set("lastName", lastName);
    student.set("email", email);

    if (classId) {
      const Class = Parse.Object.extend("Class");
      const classObj = new Class();
      classObj.id = classId;
      student.set("Class", classObj);
    } else {
      student.unset("Class");
    }

    const result = await student.save();
    return result;
  } catch (err) {
    console.error("Failed to update student:", err);
    throw err;
  }
};

