import Operations from "../models/operationsModel.js";
import errors from "../helpers/errors.js";
import Users from "../models/usersModel.js";
import {
  updateBudget,
  updateBudgetWhenDelete,
} from "../helpers/updateBudget.js";

/*
  * Add operations to the database and update the budget of the user 
  * if the user has not confirmed the account, it will not be able to add more than 5 operations
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Operations object
  
*/
const addOperations = async (req, res) => {
  
  const { amount, description, category, type, date, id } = req.body;

  const amountString = amount.toString();

  // We create an object with the data that comes in the body
  const objOper = { amount: amountString, description, category, type, date };

  const operations = new Operations(objOper);

  // We get the user by the id that comes in the body
  const userOperation = await Users.findById(id);

  // If the user has already confirmed the account, we add the operation and update the budget
  if (userOperation.confirmed) {
    operations.user = req.usersBudget._id;

    try {
      // Save the operation
      const oparationSave = await operations.save();

      res.json(oparationSave);
    } catch (error) {
      console.log(error);
    }
    // Update the budget
    await updateBudget(operations, userOperation, amount);

    return;
  }
  
  operations.user = req.usersBudget._id;

  // We get all the operations of the user
  const operationsUsers = await Operations.find()
    .where("usersBudget")
    .equals(req.usersBudget);

  const operationsFilter = operationsUsers.filter(
    (oper) => oper?.user.toString() === userOperation?._id.toString()
  );

  // If the user has not confirmed the account, we add the operation and update the budget
  if (operationsFilter.length >= 5) {
    console.log("it is not allowed to add more operations confirm your account to continue using the app");
    return errors(
      res, 
      403, 
      "it is not allowed to add more operations confirm your account to continue using the app"
    );
  }

  // Save the operation and update the budget of the user who has not confirmed the account
  try {
    const oparationSave = await operations.save();

    res.json(oparationSave);
  } catch (error) {
    console.log(error);
  }

  await updateBudget(operations, userOperation, amount);
};
/*
  * Get all operations of the user who is logged in 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Operations object
  
*/
const getOperations = async (req, res) => {
  // We get all the operations of the user
  const operations = await Operations.find()
    .where("usersBudget")
    .equals(req.usersBudget);
  
  // If the user does not have operations, we return an error
  if (!operations) {
    return errors(res, 403, "Not found");
  }

  // We filter the operations of the user who is logged in
  const operationsFilter = operations.filter(
    (oper) => oper?.user?.toString() === req.usersBudget?._id.toString()
  );

  res.json(operationsFilter);
};

/*
  * Get one operation by id
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Operations object
  
*/
const getOneOperation = async (req, res) => {
  const { id } = req.params;
  // We get the operation by id
  try {
    const operation = await Operations.findById(id);

    res.json(operation);
  } catch (error) {
    return errors(res, 403, "Not found");
  }
};

/*
  * Update the operation by id
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Operations object
  
*/
const updateOperation = async (req, res) => {
  const { id } = req.params;

  const { description, category, amount, date, _id } = req.body;

  try {
    const operation = await Operations.findById(id);
    
    // If the amount of the operation is different from the amount that comes in the body, we update the operation and the budget
    if (operation.amount !== amount) {
      operation.amount = amount || operation.amount;

      operation.date = date || operation.date;
      operation.description = description || operation.description;
      operation.category = category || operation.category;

      // Save the operation and update the budget
      try {
        const updatedOperation = await operation.save();

        res.json(updatedOperation);
      } catch (error) {
        console.log(error);
      }

      const user = await Users.findById(_id);

      if (!user) {
        return errors(res, 400, "error");
      }

      await updateBudget(operation, user, amount);
    } 
    // If the amount of the operation is the same as the amount that comes in the body, we update the operation
    else {
      operation.date = date || operation.date;
      operation.description = description || operation.description;
      operation.category = category || operation.category;

      try {
        const updatedOperation = await operation.save();

        res.json(updatedOperation);
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    return errors(res, 403, "Not found");
  }
};

/*
  * Update the budget of the user when the operation is deleted
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Operations object
  
*/
const changeBudgetWhenDeleted = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.body;

  // We get the operation by id and the user by id 
  try {
    const operation = await Operations.findById(id);

    const user = await Users.findById(_id);

    if (!user) {
      return errors(res, 400, "error");
    }
    // We update the budget of the user when the operation is deleted 
    await updateBudgetWhenDelete(operation, user, operation.amount);
  } catch (error) {
    return errors(res, 403, "Not found");
  }
};

/*
  * Delete the operation by id
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Operations object
  
*/
const deleteOperation = async (req, res) => {
  const { id } = req.params;

  // We get the operation by id and delete it 
  try {
    const operation = await Operations.findById(id);

    try {
      await operation.deleteOne();

      res.json({ msg: "Deleted operation" });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return errors(res, 403, "Not found");
  }
};

export {
  addOperations,
  getOperations,
  getOneOperation,
  updateOperation,
  changeBudgetWhenDeleted,
  deleteOperation,
};
