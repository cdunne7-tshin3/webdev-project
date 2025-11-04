import Parse from "parse";

// Back4App setup
const APP_ID = "RydYu9PBsrJmScoJD2boY6KJZwnOF9NjxoXndGC5";
const JS_KEY = "hB2XbTrMaAZZrwDIyqUB1bpb4Uypx0VGpaJlYuqj";
Parse.initialize(APP_ID, JS_KEY);
Parse.serverURL = "https://parseapi.back4app.com";

// register new user
export const createUser = (newUser) => {
  const user = new Parse.User();

  // using email as username for simplicity
  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  return user
    .signUp()
    .then((savedUser) => {
      console.log("New user created:", savedUser.id);
      return savedUser;
    })
    .catch((err) => {
      console.error("Signup failed:", err);
      alert(`Couldn't create account: ${err.message}`);
      return null;
    });
};

// login with email/password
export const loginUser = (credentials) => {
  return Parse.User.logIn(credentials.email, credentials.password)
    .then((user) => {
      console.log("Login successful");
      return user;
    })
    .catch((err) => {
      console.error("Login failed:", err);
      alert("Wrong email or password");
      return null;
    });
};

// logout
export const logoutUser = () => {
  return Parse.User.logOut()
    .then(() => {
      console.log("Logged out");
      return true;
    })
    .catch((err) => {
      console.error("Logout error:", err);
      return false;
    });
};

// check who's logged in
export const getCurrentUser = () => {
  const user = Parse.User.current();
  return user;
};
