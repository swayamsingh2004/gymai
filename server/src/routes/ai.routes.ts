import { Router } from "express";
import rateLimit from "express-rate-limit";
import verifyJWT from "../middleware/auth.middleware";
import { ai } from "../controllers/ai.controller";
import { ratelimitMiddleware } from "../middleware/rateLimit.middleware";
const router=Router();
const limiter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    message:{error:"too many requests,please wait"}
})
router.route('/').post(verifyJWT,ratelimitMiddleware,ai);

export default router