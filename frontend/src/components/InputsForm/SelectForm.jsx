import React from "react";

/*
  Select form for the category of the transaction.
  @param children: Object. Categories of the transaction.
  @param name: String. Name of the select.
  @param onChange: Function. Function to change the value of the select.
  @param value: String. Value of the select.
  @param touched: Boolean. If the select has been touched.
  @param error: Boolean. If the select has an error.
  @returns {Object} - Select form for the category of the transaction.
*/
const SelectForm = ({ children, name, onChange, value, touched, error }) => {
  return (
    // Select field
    <select
      name={name}
      className={`input_contact text-black placeholder:text-slate-400 bg-white rounded-none  mt-1 md:p-2 p-1 border  
    placeholder-slate-600
    focus:outline-none w-full block
    border-gray-500

    ${
      // If the select has an error
      error && touched
        ? "border-1 focus:border-red-500 border-red-500"
        : "focus:border-indigo-500 "
    }`}
    // Select field
      id={name}
      onChange={onChange}
      value={value}
    >
      <option value="">Select Category</option>
    
      {children}
    </select>
  );
};

export default SelectForm;
