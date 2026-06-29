import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware";
import { addExercise, getExercises } from "../controllers/exercise.controller";
import { validate } from "../middleware/validate.middleware";
import { exerciseSchema } from "../schemas/exercise.schema";
const router=Router();
router.route('/').post(verifyJWT,validate(exerciseSchema),addExercise);
router.route('/:workoutId').get(verifyJWT,getExercises)
export default router