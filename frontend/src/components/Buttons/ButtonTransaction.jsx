import React from "react";

/* 
  Button for transaction with a specific style for the transaction button.
  @param onClick: Function. Function to handle the button click.
  @param text: String. Text to display in the button.
  @returns: A button for the transaction.
*/
const ButtonTransaction = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="font-bold uppercase p-3 md:p-4 bg-green-700 hover:bg-green-900 text-white rounded-md border-2 shadow-md hover:shadow-lg transistion duration-300 ease-in-out"
    >
      {text}
    </button>
  );
};

export default ButtonTransaction;
