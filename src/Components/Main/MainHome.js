import ProtectedRoute from "../../Services/ProtectedRoute.js";
import MainGood from "./MainGood.js";

const MainHome = ({ currentUser, setCurrentUser }) => {
  const flag = currentUser !== null;

  return (
    <div>
      <ProtectedRoute
        element={MainGood}
        flag={flag}
        user={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export default MainHome;
