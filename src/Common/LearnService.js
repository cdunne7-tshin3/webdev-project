import Parse from "parse";

export const createLesson = (Name) => {
  console.log("Creating: ", Name);
  const Lesson = Parse.Object.extend("Lesson");
  const lesson = new Lesson();
  lesson.set("name", Name);
  return lesson.save().then((result) => {
    return result;
  });
};

export const getById = (id) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query.get(id).then((result) => {
    return result;
  });
};

export let Lessons = {};
Lessons.collection = [];

export const getAllLessons = () => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
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

export const removeLesson = (id) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query.get(id).then((lesson) => {
    lesson.destroy();
  });
};
