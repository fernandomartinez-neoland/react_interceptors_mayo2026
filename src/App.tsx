import Login from "./components/login/Login.component";
import "./App.css";
import { Link, Outlet } from "react-router";

function App() {
  return (
    <>
      <Link to="/Login"> Login</Link>
      <p></p>
      <Link to="/profile"> Profile</Link>
      <br />
      <Outlet />
    </>
  );
}

export default App;
