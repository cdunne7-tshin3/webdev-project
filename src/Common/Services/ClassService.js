import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new Class with Name, Description (optional)
export const createClass = (Name, Description = "") => {
  console.log("Creating: ", Name);
  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  // using setter to UPDATE the object
  classObj.set("name", Name);
  classObj.set("description", Description);
  return classObj.save().then((result) => {
    // returns new Class object
    return result;
  });
};

// READ operation - get class by ID
export const getClassById = (id) => {
  const Class = Parse.Object.extend("Class");
  const query = new Parse.Query(Class);
  return query.get(id).then((result) => {
    // return Class object with objectId: id
    return result;
  });
};

// READ operation - get all Classes
export const getAllClasses = () => {
  const Class = Parse.Object.extend("Class");
  const query = new Parse.Query(Class);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Class objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};
