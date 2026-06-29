import { Router } from "express";
import { registerUser,loginUser,logoutUser,getCurrentUser } from "../controllers/auth.controller";
import verifyJWT from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { RegisterSchema } from "../schemas/auth.schema";
import { loginSchema } from "../schemas/auth.schema";
const router=Router();
router.route('/register').post(validate(RegisterSchema),registerUser);
router.route('/login').post(validate(loginSchema),loginUser);
router.route('/logout').post(verifyJWT, logoutUser)
router.route('/me').get(verifyJWT, getCurrentUser)

export default router;