import mongoose from "mongoose";
import bcrypt from "bcrypt";
import createToken from "../helpers/createToken.js";
/*
  This schema defines the structure of the users collection in the MongoDB database.
*/
const usersSchema = mongoose.Schema(
  {
    // The name of the user
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // The email of the user
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // The password of the user
    password: {
      type: String,
      required: true,
    },

    // The budget of the user
    budget: {
      type: String,
      required: false,
      default: "0",
    },

    // The image of the user
    img: {
      type: String,
      required: false,
      default: "img",
    },

    // The token of the user
    token: {
      type: String,
      default: createToken(),
    },

    // The token expiration date
    confirmed: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);


// Hash the password before saving it to the database
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // If the password is not modified, continue with the next middleware
    next();
  }

  // Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10);

  // Set the password to the hashed password
  this.password = await bcrypt.hash(this.password, salt);
});

// Check if the password is correct
usersSchema.methods.checkPassword = async function (passForm) {
  return await bcrypt.compare(passForm, this.password);
};

// Create the model
const Users = mongoose.model("usersBudget", usersSchema);

export default Users;
