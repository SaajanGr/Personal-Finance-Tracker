import Users from "../models/usersModel.js";
import errors from "../helpers/errors.js";
import createJWT from "../helpers/createJWT.js";
import createToken from "../helpers/createToken.js";
import emailForgotPass from "../helpers/emailForgotPass.js";
import emailCheckAccount from "../helpers/emailCheckAccount.js";

/*
  * Register users in the database and send an email to confirm the account 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const registerUsers = async (req, res) => {
  const { email } = req.body;

  // Check if the email already exists
  const users = await Users.findOne({ email });

  if (users) {
    return errors(res, 400, "the email already exists");
  }

  // Create a new user with the data that comes in the body of the request and save it
  try {
    const users = new Users(req.body);

    const userSave = await users.save();

    return res.status(200).json({ msg: "user" });
  } catch (error) {
    console.log(error);
  }
};

/*
  * Login users in the database and send a token to the user 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if the email exists in the database
  const user = await Users.findOne({ email });

  if (!user) {
    return errors(res, 400, "the email dont exist");
  }

  // Check if the password is correct
  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: createJWT(user._id),
    });
  } else {
    return errors(res, 403, "the password or email is incorrect");
  }
};

/*
  * Get the profile of the user
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const getProfileUser = (req, res) => {
  const { usersBudget } = req;

  res.json(usersBudget);
};

/*
  * Request to confirm the account and send an email to the user 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const reqToConfirmAccount = async (req, res) => {
  const user = await Users.findById(req.params.id);

  if (!user) {
    return errors(res, 400, "error");
  }

  // Check if the user has already confirmed the account
  try {
    emailCheckAccount({
      email: user.email,
      name: user.name,
      token: user.token,
    });

    res.json({
      msg: "verify your email, we have sent you an email to verify your account",
    });
  } catch (error) {
    console.log(error);
  }
};

/*
  * Confirm the account of the user 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const confirmAccount = async (req, res) => {
  const { token } = req.params;

  const checkUser = await Users.findOne({ token });

  if (!checkUser) {
    return errors(res, 400, "invalid Token");
  }

  try {
    checkUser.confirmed = true;
    checkUser.token = null;

    await checkUser.save();

    res.json({ msg: "User Confirmed Successfully" });
  } catch (error) {
    console.log(error);
  }
};

/* 
  * Edit the profile of the user 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const editProfile = async (req, res) => {
  const { id } = req.params;
  const { email, name } = req.body;

  // Check if the user exists
  const user = await Users.findById(id);

  if (!user) {
    return errors(res, 400, "error");
  }

  // Check if the email already exists
  if (user.email !== req.body.email) {
    const existsEmail = await Users.findOne({ email });

    if (existsEmail) {
      return errors(res, 400, "That email is already in use");
    }
  }

  // Update the user with the new data
  try {
    user.name = name;
    user.email = email;

    const updateUser = await user.save();

    res.json(updateUser);
  } catch (error) {
    console.log(error);
  }
};

/*
  * Update the budget of the user 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const updateBudget = async (req, res) => {
  const { budget } = req.body;

  const user = await Users.findById(req.params.id);

  if (!user) {
    return errors(res, 400, "error");
  }

  const budgetString = budget.toString();

  // Update the user budget
  try {
    user.budget = budgetString;
    const updateBudgetUser = await user.save();

    res.json(updateBudgetUser);
  } catch (error) {
    console.log(error);
  }
};

/*
  * Send an email to the user to reset the password 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const userExists = await Users.findOne({ email: email });

  if (!userExists) {
    return errors(res, 403, "The email has not been registered");
  }

  // Create a token and save it in the user
  try {
    userExists.token = createToken();

    await userExists.save();

    // Send an email to the user with the token to reset the password
    emailForgotPass({
      email,
      name: userExists.name,
      token: userExists.token,
    });

    
    res.json({ msg: "We have sent an email with the instructions" });
  } catch (error) {
    console.log(error);
  }
};

/* 
  * Check if the token exists in the database 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const checkToken = async (req, res) => {
  const { token } = req.params;

  const check_token = await Users.findOne({ token });

  // Check if the token exists
  if (!check_token) {
    return errors(res, 400, "invalid Token");
  } else {
    res.json({ msg: "Valid token user exists" });
  }
};

/*
  * Create a new password for the user 
  * @param {Object} req - Request object
  * @param {Object} res - Response object
  * @returns {Object} - Users object
*/
const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const userExists = await Users.findOne({ token });

  if (!userExists) {
    return errors(res, 400, "There was a mistake");
  }

  // Update the password of the user with the new password and delete the token 
  try {
    userExists.token = null;
    userExists.password = password;
    await userExists.save();

    res.json({ msg: "Your password has been reset successfully" });
  } catch (error) {
    console.log(error);
  }
};

export {
  registerUsers,
  loginUser,
  getProfileUser,
  editProfile,
  reqToConfirmAccount,
  confirmAccount,
  updateBudget,
  forgotPassword,
  checkToken,
  newPassword,
};
