import express from "express";
import {
  registerUsers,
  loginUser,
  getProfileUser,
  updateBudget,
  forgotPassword,
  checkToken,
  newPassword,
  confirmAccount,
  reqToConfirmAccount,
  editProfile,
} from "../controllers/usersControllers.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

// register users
router.post("/register-users", registerUsers);

// login user
router.post("/login", loginUser);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Check token and create new password for the user
router.route("/forgot-password/:token").get(checkToken).post(newPassword);

// Get profile user and edit profile user with the middleware checkAuth to verify the token 
router.get("/profile", checkAuth, getProfileUser);

router.put("/edit-profile/:id", checkAuth, editProfile);

router.put("/update-budget/:id", checkAuth, updateBudget);

// Confirm account and request to confirm account with the middleware checkAuth to verify the token
router.post("/confirm-account/:id", checkAuth, reqToConfirmAccount);
router.get("/confirm-account/:token", confirmAccount);

export default router;
