import { Formik } from "formik";
import { useState } from "react";
import exp_reg from "../../helpers/Exp_reg";
import AlertAuth from "../Alerts/AlertAuth";
import AlertInputs from "../Alerts/AlertInputs";
import ButtonForm from "../Buttons/ButtonForm";
import InputsForm from "../InputsForm/InputsForm";
import SelectForm from "../InputsForm/SelectForm";
import SpinnerLoaded from "../Spinner/SpinnerLoaded";

/*
  Form to add an operation to the database and update the budget of the user 
  if the user has not confirmed the account, it will not be able to add more than 5 operations
  @returns {Object} - Form to add an operation
*/
const FormAddOperation = ({
  functionUser, // Function to add an operation
  setViewModal, // Function to close the modal
  amount,  // Amount of the operation
  description, // Description of the operation
  category, // Category of the operation
  date, // Date of the operation
  editing, // Boolean to know if the operation is being edited
  type, // Boolean to know if the operation is an expense or an income
  arrCategory, // Array of categories
  alert, // Alert object
  id, // Id of the operation
}) => {

  // Destructuring of the regular expressions
  const { name_exp, budget_exp } = exp_reg;
  const [isLoading, setLoading] = useState(false);

  // Return the form to add an operation
  return (
    <>
      {/* Form to add an operation */}
      <div className="shadow-2xl bg-gray-100 rounded">
        <Formik
          initialValues={{
            amount,
            description,
            category,
            date,
          }}
          // Validation of the form
          validate={({ amount, description, category, date }) => {
            let errors = {};

            // Validation of the amount
            if (!amount) {
              errors.amount = "Enter a valid amount.";
            } else if (!budget_exp.test(amount)) {
              errors.amount = "Please only numbers and at most 12 digits.";
            } else if (amount < 0) {
              errors.amount = "Please only numbers greater than 0.";
            }

            // Validation of the category
            if (!category) {
              errors.category = "Please choose a category.";
            } else if (!arrCategory.some((e) => [category].includes(e))) {
              errors.category = "Enter a valid category.";
            }

            // Validation of the description
            if (!description) {
              errors.description = "Enter a valid description.";
            } else if (description.length > 30) {
              errors.description = "No more than 30 characters allowed";
            } else if (!name_exp.test(description)) {
              errors.description = "No special characters allowed.";
            }
            if (!date) {
              errors.date = "Enter a valid date.";
            }
            return errors;
          }}

          /*
            Function to add an operation to the database and update the budget of the user 
            @param {Object} values - Object with the values of the form
            @returns {Object} - Operation object
          */
          onSubmit={async (values) => {

            // If the operation is being edited we update the operation with the new values of the form
            if (editing) {
              const { amount, description, category, date } = values;
              const value = { amount, description, category, date, _id: id };
              functionUser(value);
              setLoading(true);
              // Close the modal after 1.5 seconds and set the loading to false after 1.5 seconds
              setTimeout(() => {
                setLoading(false);
                setViewModal(false);
              }, 1500);
              return;
            }
            
            // If the operation is not being edited we add the operation to the database
            const typeOperation = type ? "expense" : "income";
            const { amount, description, category, date } = values;
            // Object with the values of the form
            const value = {
              amount,
              description,
              category,
              date,
              type: typeOperation,
              id,
            };

            // Function to add an operation
            functionUser(value);
            setLoading(true);
            setTimeout(() => {
              setViewModal(false);
              setLoading(false);
            }, 1500);
          }}
        >
        
          {({
            handleSubmit,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <div className="flex relative">
              {alert.msg && <AlertAuth text={alert.msg} error={alert.error} />}
              <form
                action=""
                onSubmit={handleSubmit}
                className=" w-full flex flex-col gap-5 p-5 py-7"
              >
                <div>
                  <InputsForm
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                    name="amount"
                    touched={touched.amount}
                    error={errors.amount}
                    onBlur={handleBlur}
                  />
                  <div className="mt-1">
                    {errors.amount && touched.amount && (
                      <AlertInputs error={errors.amount} />
                    )}
                  </div>
                </div>
                <div className="w-full mx-auto">
                  <SelectForm
                    name="category"
                    onChange={handleChange}
                    value={values.category}
                    touched={touched.category}
                    error={errors.category}
                    onBlur={handleBlur}
                  >
                    {arrCategory.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </SelectForm>
                  <div className="mt-1">
                    {errors.category && touched.category && (
                      <AlertInputs error={errors.category} />
                    )}
                  </div>
                </div>
                <div>
                  <InputsForm
                    type="text"
                    value={values.description}
                    onChange={handleChange}
                    name="description"
                    touched={touched.description}
                    error={errors.description}
                    onBlur={handleBlur}
                  />
                  <div className="mt-1">
                    {errors.description && touched.description && (
                      <AlertInputs error={errors.description} />
                    )}
                  </div>
                </div>
                <div>
                  <InputsForm
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    name="date"
                    touched={touched.date}
                    error={errors.date}
                    onBlur={handleBlur}
                  />
                  <div className="mt-1">
                    {errors.date && touched.date && (
                      <AlertInputs error={errors.date} />
                    )}
                  </div>
                </div>
                {!isLoading ? (
                  editing ? (
                    <div className="flex flex-col mt-2 gap-4">
                      <ButtonForm text="Save" />
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 duration-300 font-semibold p-3 px-5 rounded-md w-full"
                        onClick={() => setViewModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <ButtonForm text="Add" />
                    </div>
                  )
                ) : (
                  <div className="mt-2">
                    <SpinnerLoaded />
                  </div>
                )}
              </form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormAddOperation;
