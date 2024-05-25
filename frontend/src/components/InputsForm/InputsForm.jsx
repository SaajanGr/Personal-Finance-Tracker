import React from "react";

// Form input component for the form fields
const InputsForm = ({
  name, // Name of the input
  value, // Value of the input
  error, // Error of the input
  touched, // if the input has been touched 
  onBlur, // when the input is not focused 
  onChange, // when the input is changed
  type, // Type of the input
  placeholder, // Placeholder of the input
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="capitalize font-semibold">
        {name}
      </label>

      {/*Input field*/}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        id={name}
        name={name}
        placeholder={placeholder}
        className={`input_contact text-black placeholder:text-slate-400 bg-white rounded-none  mt-1 md:p-2 p-1 border  
            placeholder-slate-600
            focus:outline-none w-full block
            border-gray-500
    
            ${
              error && touched
                ? "border-1 focus:border-red-500 border-red-500"
                : "focus:border-indigo-500 "
            }`}
      />
    </div>
  );
};

export default InputsForm;
