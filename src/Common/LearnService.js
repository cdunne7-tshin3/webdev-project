import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE operation - new lesson with Name
export const createLesson = (Name) => {
  console.log("Creating: ", Name);
  const Lesson = Parse.Object.extend("Lesson");
  const lesson = new Lesson();
  // using setter to UPDATE the object
  lesson.set("name", Name);
  return lesson.save().then((result) => {
    // returns new Lesson object
    return result;
  });
};

// READ operation - get lesson by ID
export const getById = (id) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query.get(id).then((result) => {
    // return Lesson object with objectId: id
    return result;
  });
};

export let Lessons = {};
Lessons.collection = [];

// READ operation - get all lessons in Parse class Lesson
export const getAllLessons = () => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query
    .find()
    .then((results) => {
      console.log("results: ", results);
      // returns array of Lesson objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

// DELETE operation - remove lesson by ID
export const removeLesson = (id) => {
  const Lesson = Parse.Object.extend("Lesson");
  const query = new Parse.Query(Lesson);
  return query.get(id).then((lesson) => {
    lesson.destroy();
  });
};

// export const getArtistById = (id) => {

// }

// export const getAlbumByArtist = (artist) => {
//   const Album = Parse.Object.extend("Album");
//   const query = new Parse.Query(Album);
//   query.equalTo("artist", artist); // not artist id, it's the whole artist parse object
//   return query.find().then(results => results);
//   // [{ParseObject}]
// }
