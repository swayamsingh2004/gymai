import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware";
import { addExercise, getExercises } from "../controllers/exercise.controller";
const router=Router();
router.route('/').post(verifyJWT,addExercise);
router.route('/:workoutId').get(verifyJWT,getExercises)
export default router