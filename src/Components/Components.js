import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useState } from "react";
import Home from "./Home/Home";
import ClassMain from "./Class/ClassMain";
import StudentMain from "./Student/StudentMain";
import ProtectedRoute from "../Common/Services/ProtectedRoute";

// all routing gets handled here
const Components = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <nav style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
          <Link to="/" style={{ margin: "0 15px" }}>
            Home
          </Link>
          <Link to="/classes" style={{ margin: "0 15px" }}>
            Classes
          </Link>
          <Link to="/students" style={{ margin: "0 15px" }}>
            Students
          </Link>
        </nav>

        <Routes>
            {/* as of now the home page is default- it should default to the auth page but i don't have it yet */}
            <Route path="/" element={<Home />} />
            {/* these next 2 are protected, right now no authorization (student B work) so they always return unauthorized result! */}
            <Route 
                path="/classes" 
                element={
                    <ProtectedRoute
                        element={ClassMain}
                        flag={currentUser !== null}
                        user={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                } 
            />
            <Route 
                path="/students" 
                element={
                    <ProtectedRoute
                        element={StudentMain}
                        flag={currentUser !== null}
                        user={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                } 
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Components;


