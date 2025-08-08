import { Router } from "express";
import {signUp , login ,forgotPassword , resetPassword} from '../Controllers/authController.js'
import signupValidation from "../Middlewares/authMiddleware.js";

const router = Router();

router.post('/signup' ,  signupValidation , signUp);
router.post('/login' , login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;