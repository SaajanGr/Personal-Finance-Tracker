import React from "react";

/*
  Used to display alerts in the authentication process.
  @param error: Boolean. True if the alert is an error alert.
  @param text: String. Text to display in the alert.
  @returns: A styled alert.
*/
const AlertAuth = ({ error, text }) => {
  return (
    <div
      className={`text-sm text-white text-center ${
        error ? "bg-amber-600" : "bg-sky-600"
      } uppercase text-center p-3 rounded-md`}
    >
      <p>{text}</p>
    </div>
  );
};

export default AlertAuth;
