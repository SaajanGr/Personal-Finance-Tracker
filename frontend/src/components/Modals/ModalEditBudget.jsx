import React from "react";
import useAuth from "../../hooks/useAuth";
import FormEditBudget from "../Form/FormEditBudget";

// Modal to edit the budget of the user
const ModalEditBudget = ({ setViewModal }) => {
  const { updateBudget, auth, alert } = useAuth();

  return (
    // Modal to edit the budget of the user
    <div className="fixed top-0 w-full h-screen left-0 backdrop-brightness-50 p-2">
      <FormEditBudget
        setViewModal={setViewModal}
        functionOperation={updateBudget}
        id={auth._id}
        alert={alert}
        user_budget={auth.budget}
      />
    </div>
  );
};

export default ModalEditBudget;
