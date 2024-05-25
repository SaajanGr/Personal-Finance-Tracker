import mongoose from "mongoose";

/*
    This schema defines the structure of the operations collection in the MongoDB database.
*/
const operationsSchema = mongoose.Schema({
  // The description of the operation
  description: {
    type: String,
    required: true,
  },

  // The amount of the operation
  amount: {
    type: String,
    required: true,
  },

  // The date of the operation
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },

  // The type of the operation
  type: {
    type: String,
    required: true,
  },

  // The category of the operation
  category: {
    type: String,
    required: true,
  },

  // The user who created the operation
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersBudget",
  },
});

const Operations = mongoose.model("operations", operationsSchema);

export default Operations;
