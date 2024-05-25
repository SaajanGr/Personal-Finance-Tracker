import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Axios from "../config/Axios";
import checkToken from "../helpers/checkToken";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const OperationContext = createContext();

const MySwal = withReactContent(Swal);

/*
  Provider to manage the operations of the user 
  @param children: Object. Object to render the children components
  @returns {Object} - Provider to manage the operations of the user
*/
export const OperationProvider = ({ children }) => {
  
  const [operations, setOperations] = useState([]);


  const [loadingOper, setLoadingOper] = useState(true);

  const [editionOper, setEditionOper] = useState([]);

  const token = localStorage.getItem("token_user000123040501");

  // Get the operations of the user 
  useEffect(() => {
    const getOperation = async () => {
      try {
        const { data } = await Axios("/", checkToken(token));

        setOperations(data);
      } catch (error) {
        console.log(error);
      }

      setLoadingOper(false);
    };

    getOperation();
  }, [operations]);

  /*
    Function to add an operation of the user 
    @param {Object} value - Object with the values of the operation
    @returns {Object} - Operation object
  */
  const addOperation = async (value) => {
    try {
      const { data } = await Axios.post("/", value, checkToken(token));

      // Add the new operation to the operations array
      setOperations([data, ...operations]);

      // Show a success message when the operation is added
      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: `The ${value.type} was added successfully`,
        showConfirmButton: false,
        timer: 2000,
      });
      // If the user has not confirmed the account, show a message to confirm the account
    } catch (error) {
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response.data.msg}`,
        confirmButtonText:
          '<a href="/home/profile">I want to confirm my account</a>',
        showCancelButton: true,
      });
    }
  };

  /*
    Function to update an operation of the user 
    @param {Object} values - Object with the values of the operation
    @returns {Object} - Operation object
  */
  const updateOperation = async (values) => {
    // Update the operation with the new values
    try {
      const { data } = await Axios.put(
        `/${editionOper._id}`,
        values,
        checkToken(token)
      );

      // Update the operations array with the new values
      const updatedOperations = operations.map((oper) =>
        oper._id === data._id ? data : oper
      );

      setOperations(updatedOperations);
      
      // Show a success message when the operation is edited
      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Operation edited successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Function to set the operation to edit
  const setEdition = (oper) => {
    setEditionOper(oper);
  };

  /*
    Function to delete an operation of the user 
    @param {Object} id - Object with the id of the operation
    @param {Object} _id - Object with the _id of the operation
    @returns {Object} - Operation object
  */
  const deleteOperation = async ({ id, _id }) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      // If the user confirms the deletion of the operation, delete the operation
      if (result.isConfirmed) {
        try {
          await Axios.post(
            `operation/${id[0]}`,
            { _id },
            checkToken(token)
          ).then(await Axios.delete(`operation/${id[0]}`, checkToken(token)));

          // Delete the operation from the operations array
          const operationsDelete = operations.filter(
            (operation) => operation._id !== id
          );

          setOperations(operationsDelete);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  
  return (
    <OperationContext.Provider
      value={{
        addOperation,
        updateOperation,
        deleteOperation,
        setEdition,
        editionOper,
        operations,
        loadingOper,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

export default OperationContext;
