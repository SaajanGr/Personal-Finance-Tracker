import React, { useState } from "react";
import ButtonsTypeTransaction from "../components/Buttons/ButtonsTypeTransaction";
import ModalEditOperation from "../components/Modals/ModalEditOperation";
import TableTransactions from "../components/Table/TableTransactions";
import useAuth from "../hooks/useAuth";
import useOperation from "../hooks/useOperation";

/*
  Page to show the history of the transactions 
  @returns {Object} - Page to show the history of the transactions
*/
const HistoryUser = () => {
  const {
    operations,
    deleteOperation,
    editionOper,
    setEdition,
    updateOperation,
  } = useOperation();

  // Get the user and the alert
  const { alert, auth } = useAuth();

  // State to show the type of transaction
  const [isViewExpen, setIsViewExpen] = useState(true);

  // State to show the modal
  const [viewModal, setViewModal] = useState(false);

  // State to show the type of operation
  const [isType, setIstype] = useState("");

  // Return the page to show the history of the transactions
  return (
    <div className="pb-12 bg-gray-100 min-h-screen text-gray-800">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold mb-8 shadow-lg p-4 bg-gray-200 rounded-lg">
        Transaction History
      </h1>

      {/* Buttons to show the type of transaction */}
      <div className="flex justify-center gap-8 md:gap-12 mb-10">
        <ButtonsTypeTransaction
          type={false}
          onClick={() => setIsViewExpen(false)}
          className={`p-2 rounded-full shadow-md transition duration-300 ease-in-out ${!isViewExpen ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
        />
        <ButtonsTypeTransaction
          type={true}
          onClick={() => setIsViewExpen(true)}
          className={`p-2 rounded-full shadow-md transition duration-300 ease-in-out ${isViewExpen ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}
        />
      </div>

      {/* Table with the transactions of the user */}
      <div className="pb-32 w-full md:w-3/4 lg:w-2/3 mx-auto">
        {isViewExpen ? (
          <TableTransactions
            type="expense"
            operations={operations}
            deleteOperation={deleteOperation}
            viewModal={viewModal}
            setViewModal={setViewModal}
            setEdition={setEdition}
            _id={auth._id}
            isType={setIstype}
          />
        ) : (
          <TableTransactions
            type="income"
            operations={operations}
            deleteOperation={deleteOperation}
            viewModal={viewModal}
            setViewModal={setViewModal}
            setEdition={setEdition}
            _id={auth._id}
            isType={setIstype}
          />
        )}
      </div>

      {/* Modal to edit the operation */}
      {viewModal && (
        <ModalEditOperation
          setViewModal={setViewModal}
          editing={true}
          editionOper={editionOper}
          alert={alert}
          editOperation={updateOperation}
          id={auth._id}
          type={isType}
        />
      )}
    </div>
  );
};

export default HistoryUser;


