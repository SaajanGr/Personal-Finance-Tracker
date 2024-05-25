import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

/*
  Button to close a modal window or alert message.
  @param onClick: Function. Function to close the modal.
  @returns: A button to close the modal.
*/
const ButtonClose = ({ onClick }) => {
  return (
    <div className="absolute top-0 right-0 p-2 px-3 text-2xl md:text-3xl text-red-800 hover:text-red-600 duration-300 font-bold">
      <button className="" onClick={onClick}>
        <AiFillCloseCircle />
      </button>
    </div>
  );
};

export default ButtonClose;
