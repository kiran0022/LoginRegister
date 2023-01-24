import React from "react";
import { useState } from "react";
import { RegisterApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";
import { storeUserData } from "../services/Storage";
import "./RegisterPage.css";
import { Link, Navigate } from "react-router-dom";
import NavBar from "../components/Navbar";

function RegisterPage() {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = initialStateErrors;
    let hasError = false;

    if (inputs.name === "" || null) {
      errors.name.required = true;
      hasError = true;
    }
    if (inputs.email === "" || null) {
      errors.email.required = true;
      hasError = true;
    }
    if (inputs.password === "" || null) {
      errors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      //sending register API request
      setLoading(true); //setLoading(true)
      RegisterApi(inputs)
        .then((response) => {
          storeUserData(response.data.idToken);
        })
        .catch((err) => {
          if (err.response.data.error.message === "EMAIL_EXISTS") {
            setErrors({ ...errors, custom_error: "Email already exist" });
          } else if (
            String(err.response.data.error.message).includes("WEAK_PASSWORD")
          ) {
            setErrors({
              ...errors,
              custom_error: "Password should be at least 6 characters",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
    //setErrors(errors);
    // always dont use the state value directly as updating reference... use spread operator with state value pranthesis bracket

    setErrors({ ...errors });
    //its like updating while we use spread operator method
    // her setErrors(errors) --->  makes a undefined error coz of we directly using the state variable name in setting the state
    // so, setErrors({...errors}) --->  instead of that we use this for proper manner
    // it should a copy of state we should not use it as direct reference
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
      <NavBar />
      <section className="register-block">
        <div className="container">
          <div className="row ">
            <div className="col register-sec">
              <h2 className="text-center">Register Now</h2>
              <form onSubmit={handleSubmit} className="register-form" action="">
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Name
                  </label>

                  <input
                    type="text"
                    onChange={handleInput}
                    className="form-control"
                    name="name"
                    id=""
                  />
                  {errors.name.required === true ? (
                    <span className="text-danger">Name is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="text-uppercase"
                  >
                    Email
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    id=""
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
                    id=""
                    onChange={handleInput}
                  />
                  {errors.password.required ? (
                    <span className="text-danger">Password is required.</span>
                  ) : null}
                </div>
                <div className="form-group">
                  {errors.custom_error ? (
                    <span className="text-danger">
                      <p>{errors.custom_error}</p>
                    </span>
                  ) : null}
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

                  <input
                    type="submit"
                    className="btn btn-login float-right"
                    value="Register"
                    disabled={loading}
                  />
                </div>
                <div className="clearfix"></div>
                <div className="form-group">
                  Already have account ? Please <Link to="/login">Login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
