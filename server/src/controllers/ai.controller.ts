import { asyncHandler } from "../utils/asyncHandler";
import { Exercise } from "../models/exercise.model";
import { Workout } from "../models/workout.model";
import { getCached, setCache } from "../services/cache.services";
import { ApiResponse } from "../utils/ApiResponse";
import { analyzeWorkouts } from "../services/groq.service";
import { ApiError } from "../utils/ApiError";
const ai=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const key=userId.toString();
    const cached= await getCached(key)
    if(cached){
       return  res.status(200).json(new ApiResponse(200,cached,"Cached"));


    }
    const workouts = await Workout.find({ userId })

        const workoutsWithExercises = await Promise.all(
            workouts.map(async (workout) => {
            const exercises = await Exercise.find({ workoutId: workout._id })
            return { ...workout.toObject(), exercises }
    })
)
    const result=await analyzeWorkouts(workoutsWithExercises);
    if(!result){
        throw new ApiError(400,"Error occured while analysing")
    }
    await setCache(key,result)
    return res.status(200).json(new ApiResponse(200,result,"Succesfull"))



    

})
export {ai}