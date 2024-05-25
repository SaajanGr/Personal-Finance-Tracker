import express from "express";
import checkAuth from "../middleware/authMiddleware.js";

import {
  addOperations,
  getOperations,
  getOneOperation,
  updateOperation,
  deleteOperation,
  changeBudgetWhenDeleted,
} from "../controllers/operationsController.js";

const router = express.Router();

// Routes for operations with the middleware checkAuth to verify the token
router.route("/").post(checkAuth, addOperations).get(checkAuth, getOperations);


router
  .route("/:id")
  .get(checkAuth, getOneOperation)
  .put(checkAuth, updateOperation)
  .post(checkAuth, deleteOperation);

// 
router
  .route("/operation/:id")
  .post(checkAuth, changeBudgetWhenDeleted)
  .delete(checkAuth, deleteOperation);

export default router;
