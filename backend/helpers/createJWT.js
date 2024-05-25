import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

/* 
  This function takes the user id as an argument and returns a JWT token that expires in 30 days.
  The JWT token is signed with a secret key that is stored in the .env file.
*/
const createJWT = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

export default createJWT;

