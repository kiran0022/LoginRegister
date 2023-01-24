import React, { useState } from "react";
import "../pages/LoginPage.css";
import { LoginApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { storeUserData } from "../services/Storage";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/Navbar";

function LoginPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);
    let errors = initialStateErrors;
    let hasError = false;

    if (inputs.email === "" || null) {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "" || null) {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      //sending Login API request
      setLoading(true); //setLoading(true)
      LoginApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.code === "EMAIL_NOT_FOUND") {
            setErrors({ ...errors, custom_error: "Email not registered" });
          }
          if (err.code === "ERR_BAD_REQUEST") {
            setErrors({ ...errors, custom_error: "Invalid credentials" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    //setErrors(errors);
    // check registerpage for cause of occurance

    setErrors({ ...errors });
  };

  const handleInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  if (isAuthenticated()) {
    //call the auth function to return value true / false.  if u just mention as name it wont be working
    //redirects user to dashboard
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      {" "}
      <NavBar />
      <section className="login-block">
        <div className="container">
          <div className="row ">
            <div className="col login-sec">
              <h2 className="text-center">Login Now</h2>
              <form className="login-form" action="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id=""
                    placeholder="email"
                    onChange={handleInput}
                  />
                  {errors.email.required === true ? (
                    <span className="text-danger">Email is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="text-uppercase"
                  >
                    Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="password"
                    id=""
                    onChange={handleInput}
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <div className="text-center">
                    {loading ? (
                      <div
                        className="spinner-border text-primary "
                        role="status"
                      >
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : null}
                  </div>
                  {errors.custom_error ? (
                    <span className="text-danger">
                      <p>{errors.custom_error}</p>
                    </span>
                  ) : null}
                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    value="Login"
                    disabled={loading}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Create new account ? Please{" "}
                  <Link to="/register">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
