import React, { useEffect, useState } from "react";

import { formatDate } from "../../helpers/FormatDate";

import { MdDeleteForever } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";

/*
  Table to show the transactions of the user
  @param type: String. Type of transaction (income or expense)
  @param operations: Array. Array with the operations of the user
  @param deleteOperation: Function. Function to delete an operation of the user
  @param setEdition: Function. Function to set the operation to edit
  @param setViewModal: Function. Function to show the modal
  @param isType: Function. Function to set the type of operation to edit
  @param _id: String. Id of the user
  @returns {Object} - Table with the transactions of the user
*/
const TableTransactions = ({
  type,
  operations,
  deleteOperation,
  setEdition,
  setViewModal,
  isType,
  _id,
}) => {
  const [typeOperation, setTypeOperation] = useState([]);

  // Filter the operations by type of operation (income or expense) 
  useEffect(() => {
    const filterOperations = operations?.filter((e) => e.type === type);

    setTypeOperation(filterOperations);
  }, [operations]);

  return (
    // Table with the transactions of the user
    <div className="block  w-full overflow-x-auto px-2 p-1">
      <table
        className={`border-b-2  mx-auto  rounded-xl w-full px-5 min-w-max lg:w-2/3 shadow-2xl 
        ${
          type !== "expense"
            ? "border-cyan-500 shadow-cyan-300"
            : "border-red-600 shadow-red-300"
        }   `}
      >
        {/* Table header with the columns of the table */}
        <thead className=" ">
          <tr
            className={`${
              type !== "expense" ? "bg-cyan-500" : "bg-red-600"
            } text-white font-bold `}
          >
            <th className="py-3 px-3">Amount 💵</th>
            <th>Category 🧮</th>
            <th>Description </th>
            <th>Date 📅</th>
            <th></th>
          </tr>
        </thead>

          {/* Table body with the transactions of the user */}
        <tbody className="">
          {typeOperation?.map((oper) => (
            <tr
              className="text-center border hover:bg-slate-200 normal-case"
              key={oper._id}
            >
              <td>${oper.amount}</td>

              <td>{oper.category}</td>

              <td className=" break-all w-28 ">{oper.description}</td>

              <td className="">{formatDate(oper.date)}</td>

              <td className="flex gap-5 my-5  items-center px-5">
                {/* Buttons to edit and delete the operation */}
                <button
                  className="text-xl text-blue-700"
                  onClick={() => {
                    isType(oper.type);
                    setViewModal(true);
                    setEdition(oper);
                  }}
                >
                  <BsPencilFill />
                </button>

                <button
                  className="text-2xl text-red-700"
                  onClick={() => deleteOperation({ id: [oper._id], _id })}
                >
                  <MdDeleteForever />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableTransactions;
