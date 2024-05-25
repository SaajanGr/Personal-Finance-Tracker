import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import InputsForm from "../InputsForm/InputsForm";
import ButtonForm from "../Buttons/ButtonForm";
import exp_reg from "../../helpers/Exp_reg";
import AlertAuth from "../Alerts/AlertAuth";
import AlertInputs from "../Alerts/AlertInputs";
import LinkAuth from "../Link/LinkAuth";


/*
  Form to login or register the user with the name, email and password fields  
  @param login: Boolean. Boolean to know if the user is going to login or register
  @param functionUser: Function. Function to login or register the user
  @param alert: Object. Alert object
  @returns {Object} - Form to login or register the user
*/
const FormLoginAndRegister = ({ login, functionUser, alert }) => {
  const { email_exp, pass_exp, name_exp } = exp_reg;

  return (
    <>
      <div className="bg-gray-100 p-5 md:p-16 w-full sm:w-2/3 xl:w-1/3 py-16 mt-10 mx-auto rounded-md shadow-md hover:shadow-xl">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          // Validation of the form
          validate={({ email, password, name }) => {
            let errors = {};
            // Validation of the email, the name and the password
            if (!email) {
              errors.email = "Enter a valid email.";
            } else if (!email_exp.test(email)) {
              errors.email = "Enter a valid email.";
            }
            if (!login) {
              if (!name) {
                errors.name = "Enter a valid name.";
              } else if (!name_exp.test(name)) {
                errors.name = "Enter a valid name.";
              }
            }
            if (!password) {
              errors.password =
                "Password must contain at least 6 characters and must contain at least one capital letter and one numeric character. ";
            } else if (!pass_exp.test(password)) {
              errors.password =
                "Password must contain at least 6 characters and must contain at least one capital letter and one numeric character. ";
            }
            return errors;
          }}
          // Submit the form
          onSubmit={async ({ email, name, password }, { resetForm }) => {
            const emailtoLowerCase = email.toLowerCase();
            const value = { email: emailtoLowerCase, password, name };
            functionUser(value);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            // Form to login or register the user
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 md:gap-7"
            >
              {alert.msg && <AlertAuth text={alert.msg} error={alert.error} />}
              <h2 className="text-center font-bold capitalize text-2xl md:text-4xl ">
                {login ? "Login" : "Register "}
              </h2>
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-2xl font-semibold">
                  Welcome to Personal Finance Tracker
                </h2>
                <p>
                  {login
                    ? "Login and manage your expenses and income."
                    : "Sign in and manage your expenses and income."}
                </p>
              </div>
              {/* If the user is going to register, the name field is shown */}
              {!login && (
                <div>
                  <InputsForm
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    name="name"
                    touched={touched.name}
                    error={errors.name}
                    onBlur={handleBlur}
                    placeholder="Your Name"
                  />
                  <div className="mt-1">
                    {errors.name && touched.name && (
                      <AlertInputs error={errors.name} />
                    )}
                  </div>
                </div>
              )}
              {/*Email and password fields*/}
              <div>
                <InputsForm
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  touched={touched.email}
                  error={errors.email}
                  onBlur={handleBlur}
                  placeholder="Your Email"
                />
                <div className="mt-1">
                  {errors.email && touched.email && (
                    <AlertInputs error={errors.email} />
                  )}
                </div>
              </div>
              {/*} If the user is going to login, the password field is shown */}
              <div>
                <InputsForm
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                  touched={touched.password}
                  error={errors.password}
                  onBlur={handleBlur}
                  placeholder="Your password"
                />
                <div className="mt-1">
                  {errors.password && touched.password && (
                    <AlertInputs error={errors.password} />
                  )}
                </div>
              </div>
              {/*} Button to login or register */}
              {login ? (
                <div className="flex flex-col gap-4">
                  <Link
                    to="/forgot-password"
                    className="text-gray-500 hover:text-gray-700 duration-100 "
                  >
                    Forgot Password?
                  </Link>
                  <ButtonForm text="Login" />
                </div>
              ) : (
                <ButtonForm text="Sign In" />
              )}
              {/*} Link to login or register */}
              <div className="text-center">
                {login ? (
                  <LinkAuth
                    text={"Don't have an account? "}
                    text2="Create one now"
                    nav={"/sign-in"}
                  />
                ) : (
                  <LinkAuth
                    text={"You have an account? "}
                    text2="Login now"
                    nav={"/"}
                  />
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormLoginAndRegister;
