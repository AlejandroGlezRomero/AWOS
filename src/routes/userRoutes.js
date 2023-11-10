import express from "express";
//import userController from '../controllers/userController.js';
import {
    formLogin,
    formRegister,
    formPasswordRecovery,
    insertUser,
    confirmAccount,
    resetPassword,
    changePassword,
    updatePassword,
    authenticateUser,
    homePage
  } from "../controllers/userController.js";
  



const router = express.Router();

router.get("/login/", formLogin)
router.get("/login/register", formRegister);
router.get("/login/recovery", formPasswordRecovery);
router.post("/login/register-account", insertUser);

// confirm account
router.get("/login/confirm/:token", confirmAccount)

// Reset Password
router.post("/login/password-recovery", resetPassword);
// Change Password
router.get("/login/change-password/:tokenPassword", changePassword);
router.post("/login/update-password/:tokenPassword", updatePassword);

// Authenticate
router.post('/', authenticateUser)  ;

router.get('/', homePage);

export default router;