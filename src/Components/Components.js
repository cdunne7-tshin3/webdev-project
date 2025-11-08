import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { useState , useEffect } from "react";
import Home from "./Home/Home";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js";
import ClassMain from "./Class/ClassMain";
import StudentMain from "./Student/StudentMain";
import ProtectedRoute from "../Common/Services/ProtectedRoute";
import { getCurrentUser, logoutUser } from "./Auth/AuthService";

// all routing gets handled here
const Components = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingUser = getCurrentUser();
    if (existingUser) {
      console.log("Found existing session");
      setCurrentUser(existingUser);
    }
    setLoading(false);
  }, []);

  const isLoggedIn = currentUser !== null;

  const handleLogOut = () => {
    logoutUser();
    setCurrentUser(null);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {isLoggedIn && (
          <nav
            style={{
              padding: "20px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Link to="/home" style={{ margin: "0 15px" }}>
                Home
              </Link>
              <Link to="/classes" style={{ margin: "0 15px" }}>
                Classes
              </Link>
              <Link to="/students" style={{ margin: "0 15px" }}>
                Students
              </Link>
            </div>

            <button onClick={handleLogOut}>Log Out</button>
          </nav>
        )}

        <Routes>
            {/* landing auth page */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            {/* auth pages - redirect if already logged in */}
            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" replace />
                ) : (
                  <AuthRegister setCurrentUser={setCurrentUser} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/home" replace />
                ) : (
                  <AuthLogin setCurrentUser={setCurrentUser} />
                )
              }
            />
            {/* protected routes */}
            <Route 
                path="/home" 
                element={
                    <ProtectedRoute
                        element={Home}
                        flag={currentUser !== null}
                        user={currentUser}
                        setCurrentUser={setCurrentUser}
                    />
                } 
            />
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

            {/* catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Components;


