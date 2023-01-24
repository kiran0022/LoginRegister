import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import { userDetailsApi } from "../services/Api";
import { isAuthenticated, logout } from "../services/Auth";

const DashboardPage = () => {
  const navigate = useNavigate(); //react router feature

  const [user, setUser] = useState({ name: "", email: "", localId: "" });

  useEffect(() => {
    if (isAuthenticated()) {
      userDetailsApi().then((response) => {
        setUser({
          name: response.data.users[0].displayName,
          email: response.data.users[0].email,
          localId: response.data.users[0].localId,
        });
      });
    }
  }, []);

  const logoutUser = () => {
    logout();
    navigate("/login"); // this the redirect to the login page when user clicks
  };

  if (!isAuthenticated()) {
    //redirects user to login
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <NavBar logoutUser={logoutUser} />

      {isAuthenticated() ? (
        <main role="main" className="container mt-5 card">
          <div className="container w-50 ">
            <div className=" mt-5 mb-5">
              <h3>Dashboard page</h3>
              {user.name && user.email && user.localId ? (
                <div className="">
                  <p className="text-bold card-text ">
                    Hello, {user.displayName} your Firebase ID is{" "}
                    <span className="text-muted">{user.localId}</span>
                  </p>
                  <p className="">{user.email}</p>
                </div>
              ) : (
                <div class="spinner-border text-success" role="status"></div>
              )}
            </div>
          </div>
        </main>
      ) : (
        <h1>Invalid Access</h1>
      )}
    </div>
  );
};

export default DashboardPage;
