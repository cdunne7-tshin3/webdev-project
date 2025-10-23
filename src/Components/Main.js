import React, { useState, useEffect } from "react";
import { getAllLessons, Lessons } from "../Common/LearnService";
import MainList from "./MainList";

const Main = () => {
  // Variables in the state to hold data
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Lessons.collection.length) {
      setLessons(Lessons.collection);
      setLoading(false);
    } else {
      getAllLessons().then((lessons) => {
        console.log("Fetched lessons:", lessons);
        setLessons(lessons || []);
        setLoading(false);
      });
    }
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lesson Management</h1>
      {loading ? <p>Loading lessons...</p> : <MainList lessons={lessons} />}
    </div>
  );
};

export default Main;
