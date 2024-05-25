import React from "react";

/*
  Button for forms with a specific style for the transaction type button in the form.
  @param onClick: Function. Function to set the transaction type.
  @param text: String. Text to display in the button.
  @returns: A button for the transaction type.
*/
const ButtonFormtype = ({ onClick, text }) => {
  return (
    <button
      className={`uppercase text-xl md:text-2xl border-neutral-300 border-2 px-2 py-1 rounded-md shadow-md hover:shadow-lg
    ${text === "expense" ? "hover:text-orange-500" : "hover:text-emerald-600"} 
    ${
      text === "expense"
        ? "hover:border-orange-500"
        : "hover:border-emerald-600"
    } 
    duration-200`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonFormtype;
