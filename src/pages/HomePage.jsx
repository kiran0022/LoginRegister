import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="text-center p-4">
        <h1>Welcome !</h1>
        <p className="text-info">
          Simple Login & Register with{" "}
          <span className="text-warning">Firebase</span>
        </p>
        <Link to="/login">
          <button type="button" class="btn btn-outline-dark">
            Start here
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
