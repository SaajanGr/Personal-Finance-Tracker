import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/usersModel.js";
import errors from "../helpers/errors.js";

// Load environment variables from .env file
dotenv.config();

/*
  This function checks if the user is authenticated by verifying the token.
  @param {Object} req - Request object
  @param {Object} res - Response object
  @param {Function} next - Middleware function
  @returns {Function} - Next middleware function
*/
const checkAuth = async (req, res, next) => {
  let token;

  // Check if the authorization header is present and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    
    // Get the token from the authorization header and verify it with the secret key 
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.usersBudget = await Users.findById(decoded.id).select(" -password ");

      return next();
    } catch (error) {
      return errors(res, 403, "Token invalidate");
    }
  }

  // If the token is not present, return an error
  if (!token) {
    return errors(res, 403, "Token invalidate");
  }

  next();
};

export default checkAuth;

