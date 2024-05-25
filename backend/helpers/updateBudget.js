/*
  This helper function is used to update the budget of the user when a new operation is added or deleted.
  @param {Object} operations - The operation object
  @param {Object} user - The user object
  @param {Number} amount - The amount of the operation
  @returns {Promise} - The updated user object
*/
export const updateBudget = async (operations, user, amount) => {
  // If the operation is an income, we add the amount to the user budget
  if (operations?.type === "income") {
    const budgetNumber = Number(user.budget) + amount;

    const budgetString = budgetNumber.toString();
    // Update the user budget
    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  } 
  // If the operation is an expense, we subtract the amount from the user budget
  else {
    const budgetNumber = Number(user.budget) - amount;

    const budgetString = budgetNumber.toString();
    // Update the user budget 
    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
};

/*
  This helper function is used to update the budget of the user when an operation is deleted.
  @param {Object} operations - The operation object
  @param {Object} user - The user object
  @param {Number} amount - The amount of the operation
  @returns {Promise} - The updated user object
*/
export const updateBudgetWhenDelete = async (operations, user, amount) => {
  // If the operation is an income, we subtract the amount from the user budget
  if (operations?.type === "income") {
    const budgetNumber = Number(user.budget) - Number(amount);

    const budgetString = budgetNumber.toString();
    // Update the user budget
    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  } 
  // If the operation is an expense, we add the amount to the user budget
  else {
    const budgetNumber = Number(user.budget) + Number(amount);

    const budgetString = budgetNumber.toString();
    // Update the user budget
    try {
      user.budget = budgetString;
      await user.save();
    } catch (error) {
      console.log(error);
    }
  }
};
