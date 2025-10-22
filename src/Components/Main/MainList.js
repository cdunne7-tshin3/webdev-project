/* STATEFUL PARENT COMPONENT */
const MainList = ({ classes, students }) => {
  classes = Array.isArray(classes) ? classes : [];
  students = Array.isArray(students) ? students : [];
  return (
    <div>
      <hr />
      This is the main list stateless child component.
      <div>
        <p> Classes: </p>
        {/* Check that the class object exists */}
        {classes.length > 0 && (
          <ul>
            {classes.map((c) => (
              <li key={c.id}>
                {" "}
                {c.get("Name")} | {c.get("Description")}{" "}
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
      <div>
        <p> Students: </p>
        {/* Check that the student object exists */}
        {students.length > 0 && (
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                {" "}
                {student.get("email")} | {student.get("firstName")}{" "}
                {student.get("lastName")}{" "}
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
    </div>
  );
};

export default MainList;
