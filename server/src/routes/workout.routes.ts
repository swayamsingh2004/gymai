import { Router } from "express"
import verifyJWT from "../middleware/auth.middleware"
import { createWorkout, getWorkouts, getWorkoutById } from "../controllers/workout.controller"

const router = Router()

router.route('/').post(verifyJWT, createWorkout)
router.route('/').get(verifyJWT, getWorkouts)
router.route('/:id').get(verifyJWT, getWorkoutById)

export default router