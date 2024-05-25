import React, { useState } from "react";
import ButtonsTypeTransaction from "../components/Buttons/ButtonsTypeTransaction";
import ButtonTransaction from "../components/Buttons/ButtonTransaction";
import ModalAddOperation from "../components/Modals/ModalAddOperation";
import Expense from "../components/TypePieChart/Expense";
import Income from "../components/TypePieChart/Income";
import useAuth from "../hooks/useAuth";
import useOperation from "../hooks/useOperation";

/*
  Page to show the financial summary of the user
*/
const HomeUser = () => {
  // Get the user and the alert
  const { auth, alert } = useAuth();

  // Get the operations and the function to add an operation
  const { addOperation, operations } = useOperation();

  // State to show the modal
  const [viewModal, setViewModal] = useState(false);

  // State to show the type of transaction
  const [isExpense, setIsExpense] = useState(true);

  return (
    <div className="pb-12 bg-gray-100 min-h-screen text-gray-800">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 shadow-lg p-4 bg-gray-200 rounded-lg">
        {`Financial Summary for ${auth.name}`}
      </h2>

      {/* Show the alert */}
      <div className="flex justify-center mb-10">
        <ButtonTransaction
          text="Add Transaction"
          onClick={() => setViewModal(true)}
          className="bg-blue-500 text-white hover:bg-blue-600 transition duration-300 ease-in-out p-3 rounded-full shadow-md"
        />
      </div>

      {/* Buttons to show the type of transaction */}
      <div className="flex gap-8 md:gap-12 justify-center mb-6">
        <ButtonsTypeTransaction
          type={false}
          onClick={() => setIsExpense(false)}
          className={`p-2 rounded-full shadow-md transition duration-300 ease-in-out ${!isExpense ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
        />
        <ButtonsTypeTransaction
          type={true}
          onClick={() => setIsExpense(true)}
          className={`p-2 rounded-full shadow-md transition duration-300 ease-in-out ${isExpense ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
        />
      </div>

      {/* Show the pie chart */}
      <div className="mt-12 w-full md:w-1/2 lg:w-1/3 mx-auto bg-white p-6 rounded-lg shadow-lg">
        {isExpense ? (
          <Expense operations={operations} />
        ) : (
          <Income operations={operations} />
        )}
      </div>

      {/* Show the modal to add an operation */}
      {viewModal && (
        <ModalAddOperation
          setViewModal={setViewModal}
          addOperation={addOperation}
          alert={alert}
          id={auth._id}
        />
      )}
    </div>
  );
};

export default HomeUser;


