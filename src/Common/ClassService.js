import Parse from "parse";

export const createClass = (Name, Description = "") => {
  console.log("Creating: ", Name);
  const Class = Parse.Object.extend("Class");
  const classObj = new Class();
  classObj.set("name", Name);
  classObj.set("description", Description);

  return classObj.save().then((result) => {
    return result;
  });
};

export const getClassById = (id) => {
  const Class = Parse.Object.extend("Class");
  const query = new Parse.Query(Class);
  return query.get(id).then((result) => {
    return result;
  });
};

export const getAllClasses = () => {
  const Class = Parse.Object.extend("Class");
  const query = new Parse.Query(Class);
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

export const removeClass = (id) => {
  const Class = Parse.Object.extend("Class");
  const query = new Parse.Query(Class);
  return query.get(id).then((classObj) => {
    classObj.destroy();
  });
};
