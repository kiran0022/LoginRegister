import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/Auth";

export default function NavBar(props) {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand text-secondary-emphasis fs-1">Log_Reg</a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticated() ? (
            <li className="nav-item fw-semibold">
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </li>
          ) : null}
          {!isAuthenticated() ? (
            <li>
              <Link className="nav-link fw-semibold" to="/login">
                Login
              </Link>
            </li>
          ) : null}
          {isAuthenticated() ? (
            <li className="nav-item fw-semibold">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
          ) : null}
          {isAuthenticated() ? (
            <li>
              <a
                className="nav-link text-danger fw-semibold "
                style={{ cursor: "pointer" }}
                onClick={props.logoutUser}
              >
                Logout
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
