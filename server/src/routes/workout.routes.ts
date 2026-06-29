import { Router } from "express"
import verifyJWT from "../middleware/auth.middleware"
import { createWorkout, getWorkouts, getWorkoutById } from "../controllers/workout.controller"
import { validate } from "../middleware/validate.middleware"
import { WorkoutSchema } from "../schemas/workout.schema"

const router = Router()

router.route('/').post(verifyJWT,validate(WorkoutSchema), createWorkout)
router.route('/').get(verifyJWT, getWorkouts)
router.route('/:id').get(verifyJWT, getWorkoutById)

export default router