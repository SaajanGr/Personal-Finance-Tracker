import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormForgotPassword from "../components/Form/FormForgotPassword";
import Axios from "../config/Axios";
import useAuth from "../hooks/useAuth";

/*
  Page to create a new password
  @returns {Object} - Page to create a new password
*/
const NewPass = () => {
  const { alert, setAlert } = useAuth();

  const [validToken, setValidToken] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  const { token } = params;

  // Check if the token is valid
  useEffect(() => {
    const checkToken = async () => {
      try {
        await Axios(`/forgot-password/${token}`);

        // If the token is valid we set the validToken to true
        setValidToken(true);
      } catch (error) {
        console.log(error);

        // If the token is not valid we set the alert with an error message
        setAlert({
          msg: "There was an error in the link",
          error: true,
        });
      }

      setLoading(false);
    };

    checkToken();
  }, []);

  /*
    Function to create a new password for the user
    @param {Object} value - Object with the new password
    @returns {Object} - Message with the result of the request
  */
  const newPassword = async (value) => {
    try {
      const { data } = await Axios.post(`/forgot-password/${token}`, value);

      setAlert({
        msg: data.msg,
        error: false,
      });

      // Redirect to the login page after 2.5 seconds if the password is created
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 4000);
    }
  };

  if (loading) return "loading";

  // If the token is valid we show the form to create a new passwordq
  return (
    <>
      {validToken ? (
        <FormForgotPassword
          sendEmail={false}
          functionUser={newPassword}
          alert={alert}
        />
      ) : (
        <h1 className="text-center uppercase text-2xl text-red-700">
          There was an error in the link
        </h1>
      )}
    </>
  );
};

export default NewPass;
