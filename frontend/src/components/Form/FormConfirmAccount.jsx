import { Formik } from "formik";
import React from "react";
import AlertAuth from "../Alerts/AlertAuth";

/*
  Form to send an email to confirm the account of the user who has not confirmed the account yet
  @param id: String. Id of the user
  @param sendEmailToConfirmAccount: Function. Function to send an email to confirm the account
  @param alert: Object. Alert object
  @returns {Object} - Form to send an email to confirm the account

*/
const FormConfirmAccount = ({ id, sendEmailToConfirmAccount, alert }) => {
  return (
    <>
      {/* Form to send an email to confirm the account */}
      <Formik
        initialValues={{
          id: id,
        }}
        // Validation of the form
        onSubmit={({ id }) => {
          sendEmailToConfirmAccount(id);
        }}
      >
        {({ handleSubmit }) => (
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 py-3"
          >
            <div className="mx-auto">
              <button
                className="px-4 p-2 bg-red-600 rounded-lg text-gray-100 font-bold uppercase hover:bg-red-800 transistion duration-150 ease-in-out"
                type="submit"
              >
                Send an email to confirm
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormConfirmAccount;
