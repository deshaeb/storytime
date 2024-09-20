import { Link } from "react-router-dom";
import * as authService from "../../services/authService";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <img src="/images/logo.jpg" alt="Logo"/>
      <nav className="nav-container">
        <Link to="/">Home</Link>
        &nbsp; | &nbsp;
        {user ? (
          <>
            <Link to="/books">Book List</Link>
            &nbsp; | &nbsp;
            <Link to="/books/new">New Book</Link>
            &nbsp; | &nbsp;
            <Link to="" onClick={handleLogOut}>
              Log Out
            </Link>
            &nbsp;&nbsp;
            <span>Welcome, {user.name}</span>
          </>
        ) : (
          <>
            <Link to="/login">Log In</Link>
            &nbsp; | &nbsp;
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </nav>
  );
}
