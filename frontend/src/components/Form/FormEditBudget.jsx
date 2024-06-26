import { Formik } from "formik";
import React, { useState } from "react";
import exp_reg from "../../helpers/Exp_reg";
import AlertAuth from "../Alerts/AlertAuth";
import AlertInputs from "../Alerts/AlertInputs";
import ButtonClose from "../Buttons/ButtonClose";
import ButtonForm from "../Buttons/ButtonForm";
import InputsForm from "../InputsForm/InputsForm";
import SpinnerLoaded from "../Spinner/SpinnerLoaded";

/*
  Form to edit the budget of the user with the possibility of changing the budget of the user
  @param setViewModal: Function. Function to close the modal
  @param functionOperation: Function. Function to edit the budget of the user
  @param id: String. Id of the user
  @param alert: Object. Alert object
  @param user_budget: String. Budget of the user
  @returns {Object} - Form to edit the budget
*/
const FormEditBudget = ({
  setViewModal,
  functionOperation,
  id,
  alert,
  user_budget,
}) => {
  // Destructuring of the regular expressions and the budget 
  const { budget_exp } = exp_reg;
  const [isLoading, setLoading] = useState(false);

  // Return the form to edit the budget
  return (
    <div className="shadow-2xl bg-gray-100 rounded-md w-full sm:w-2/3 xl:w-1/3 mx-auto my-40 p-5 relative">
      <h2 className="text-center md:text-2xl uppercase font-medium text-stone-800">
        Change your budget here
      </h2>
      <div className="border border-yellow-600 md:w-2/3 mx-auto my-5 p-2 rounded-3xl">
        <p className="text-center text-xl font-medium">
          Your current budget is:{" "}
          {user_budget.startsWith("-") ? (
            <span className="text-orange-700 font-bold">
              ${user_budget}
            </span>
          ) : (
            <span className="text-teal-600 font-bold">
              ${user_budget}
            </span>
          )}
        </p>
      </div>
      <Formik
        initialValues={{
          budget: "",
        }}
        validate={({ budget }) => {
          let errors = {};
          // Validation of the budget
          if (!budget) {
            errors.budget = "Enter a valid budget.";
          } else if (!budget_exp.test(budget)) {
            errors.budget = "Please only numbers and at most 12 digits.";
          } else if (budget < 0) {
            errors.budget = "Please only numbers greater than 0.";
          }
          return errors;
        }}
        // Submit of the form
        onSubmit={({ budget }) => {
          functionOperation({ id, budget });
          setLoading(true);
          setTimeout(() => {
            setViewModal(false);
            setLoading(false);
          }, 2500);
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
        }) => (
          <form
            action=""
            className="p-5 md:w-2/3 mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <InputsForm
                type="number"
                value={values.budget}
                onChange={handleChange}
                name="budget"
                placeholder="Please enter your new budget "
                touched={touched.budget}
                error={errors.budget}
                onBlur={handleBlur}
              />
              <div className="mt-1">
                {errors.budget && touched.budget && (
                  <AlertInputs error={errors.budget} />
                )}
              </div>
            </div>
            {alert.msg && <AlertAuth text={alert.msg} error={alert.error} />}
            {!isLoading ? (
              <div className="mt-10 w-2/3 mx-auto">
                <ButtonForm text="Update Budget" />
              </div>
            ) : (
              <div className="mt-10 w-2/3 mx-auto">
                <SpinnerLoaded />
              </div>
            )}
          </form>
        )}
      </Formik>
      <ButtonClose onClick={() => setViewModal(false)} />
    </div>
  );
};

export default FormEditBudget;
