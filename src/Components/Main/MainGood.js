import { useNavigate } from "react-router-dom";
import { logoutUser } from "../Auth/AuthService"; // <- Fixed path

const MainGood = ({ user, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    logoutUser().then((success) => {
      if (!success) return;

      setCurrentUser(null);
      navigate("/");
    });
  };

  // handle both parse user and regular object
  const firstName = user?.get
    ? user.get("firstName")
    : user?.firstName || "Guest";

  return (
    <div>
      <h1>User: {firstName}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default MainGood;
