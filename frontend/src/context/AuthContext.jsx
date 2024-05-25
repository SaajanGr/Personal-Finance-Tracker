import React, { useState, useEffect } from "react";
import { createContext } from "react";
import Axios from "../config/Axios";
import checkToken from "../helpers/checkToken";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const AuthContext = createContext();

/*
  Provider to manage the authentication of the user 
  @param children: Object. Object to render the children components
  @returns {Object} - Provider to manage the authentication of the user

*/
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const [loading, setLoading] = useState(true);

  const [alert, setAlert] = useState({});

  const token = localStorage.getItem("token_user000123040501");

  const MySwal = withReactContent(Swal);

  // Check if the user is authenticated
  useEffect(() => {
    const authUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await Axios("/profile", checkToken(token));

        setAuth(data);
      } catch (error) {
        setAuth({});

        return {
          msg: error?.response.data.msg,
          error: true,
        };
      }

      setLoading(false);
    };

    authUser();
  }, [auth]); 

  /*
    Function to login the user 
    @param {Object} values - Object with the values of the form
    @returns {Object} - User object
  */
  const loginUser = async ({ email, password }) => {
    // Login the user
    try {
      const { data } = await Axios.post("/login", { email, password });

      localStorage.setItem("token_user000123040501", data.token);

      setAuth(data);

      window.location.href = "/home";
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 5000);
    }
  };

  /*
    Function to register the user 
    @param {Object} values - Object with the values of the form
    @returns {Object} - User object
  */
  const registerUser = async ({ name, email, password }) => {
    // Register the user
    try {
      const { data } = await Axios.post("/register-users", {
        name,
        email,
        password,
      });

      setAlert({
        msg: "Your account was created successfully!, Now you can login",
        error: false,
      });

      // Redirect to the login page after 1 second
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      return;
    }
  };

  /*
    Function to edit the profile of the user 
    @param {Object} values - Object with the values of the form
    @returns {Object} - User object
  */
  const editProfile = async (values) => {
    console.log(values);

    // Edit the profile of the user
    try {
      const { data } = await Axios.put(
        `/edit-profile/${values.id}`,
        values,
        checkToken(token)
      );

      console.log(data);

      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Your account was successfully edited!",
        showConfirmButton: false,
        timer: 1500,
      });
      // Redirect to the home page after 1.5 seconds
    } catch (error) {
      setAlert({
        msg: error?.response.data.msg,
        error: true,
      });

      setTimeout(() => {
        setAlert({});
      }, 3000);
    }
  };

  /*
    Function to send an email to confirm the account of the user 
    @param {String} id - String with the id of the user
    @returns {Object} - User object
  */
  const sendEmailToConfirmAccount = async (id) => {
    // Send an email to confirm the account of the user
    try {
      const { data } = await Axios.post(
        `/confirm-account/${id}`,
        {},
        checkToken(token)
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      // Close the alert after 4 seconds
      setTimeout(() => {
        setAlert({});
      }, 4000);
    } catch (error) {
      console.log(error);
    }
  };

  /*
    Function to update the budget of the user 
    @param {Object} values - Object with the values of the form
    @returns {Object} - User object
  */
  const updateBudget = async ({ id, budget }) => {
    // Update the budget of the user
    try {
      const { data } = await Axios.put(
        `/update-budget/${id}`,
        { budget },
        checkToken(token)
      );

      setAuth(data);
      // Show a success message after 1.5 seconds
      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Congratulations change made successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);

      return;
    }
  };

  /*
    Function to send an email to recover the password of the user 
    @param {Object} values - Object with the values of the form
    @returns {Object} - User object
  */
  const sendEmailToRecoverPassword = async (value) => {
    try {
      const { data } = await Axios.post("/forgot-password", value);
      // Show a success message after 4 seconds
      setAlert({
        msg: data.msg,
        error: false,
      });

      // Close the alert after 4 seconds
      setTimeout(() => {
        setAlert({});
      }, 4000);
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

  /*
    Function to log out the user 
    @returns {Object} - User object
  */
  const logOut = async () => {
    
    MySwal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      // Log out the user if the user confirms
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token_user000123040501");

        setAuth({});

        return;
      }
    });
  };

  return (
    // Provider to manage the authentication of the user
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        updateBudget,
        sendEmailToConfirmAccount,
        editProfile,
        sendEmailToRecoverPassword,
        logOut,
        setAuth,
        setAlert,
        auth,
        loading,
        alert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
