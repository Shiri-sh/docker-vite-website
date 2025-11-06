import { useState } from "react";
import News from "./news";
import Games from "./games";
import SignUp from "./signUp";
import Login from "./login";
import "./css/home.css";
import { useContext } from "react";
import { ContextUser } from "./contextUser.jsx";
const Home = () => {
  const [activeForm, setActiveForm] = useState("login");
  const { user , setUser} = useContext(ContextUser);
  const logout = () => {
    localStorage.setItem("currentToken", "");
    setUser(null);
  };
  return (
    <>
      <h2 className="welcome-title">Welcome aboard {user ? user.username : ""}</h2>

      <div className="form-toggle">
        {user && <button onClick={logout}>Logout</button>}
        <button
          className={activeForm === "login" ? "active" : ""}
          onClick={() => setActiveForm("login")}
        >
          Login
        </button>
        <button
          className={activeForm === "signup" ? "active" : ""}
          onClick={() => setActiveForm("signup")}
        >
          Sign Up
        </button>
      </div>
    
      <div className="form-container">
        {activeForm === "login" ? <Login /> : <SignUp />}
      </div>

      <div className="home-container">
        <div className="games-column column">
          <h2>Games</h2>
          <Games />
        </div>
        <div className="news-column column">
          <h2>News</h2>
          <News />
        </div>
      </div>
    </>
  );
};

export default Home;
