import React from "react";

/*
  Button for the transaction type in the transaction form.
  @param type: Boolean. True for expense, false for income.
  @param onClick: Function. Function to set the transaction type.
  @returns: A button for the transaction type.
*/
const ButtonsTypeTransaction = ({ type, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={`text-center font-bold text-lg md:text-2xl uppercase border-2 focus:border focus:border-gray-600 duration-100 px-3 py-1 rounded-md shadow-md active:shadow-lg
    border-b-4 active:border-b-4 ${
      type === true ? "border-red-500" : "border-cyan-500"
    } `}
      >
        {` ${type === true ? "Expense " : "Income "}`}
      </button>
    </>
  );
};

export default ButtonsTypeTransaction;
