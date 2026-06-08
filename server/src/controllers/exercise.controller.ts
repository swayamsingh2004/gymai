import { Exercise } from "../models/exercise.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { Workout } from "../models/workout.model";
import { ApiResponse } from "../utils/ApiResponse";
import { deleteCache } from "../services/cache.services";

const addExercise=asyncHandler(async(req,res)=>{
    const{workoutId,exerciseName,sets}=req.body;
    if (!workoutId || !exerciseName) {
    throw new ApiError(400, "workoutId and exerciseName are required")
}
    if (!sets || !Array.isArray(sets) || sets.length === 0) {
    throw new ApiError(400, "sets are required")
}
    const workout=await Workout.findById(workoutId);
    if(!workout){
        throw new ApiError(400,"Workout doesnt exist or invalid id")
    }
    const exercise=await Exercise.create({
        workoutId:workoutId,
        exerciseName:exerciseName,
        sets:sets


    })
    await deleteCache(req.user._id.toString())

    
    
    res.status(201).json(new ApiResponse(201,exercise,"Created Succesfully"))
})
const getExercises=asyncHandler(async(req,res)=>{
    const workoutId=req.params.workoutId;
    if(!workoutId){
        throw new ApiError(400,"Workout Id not Found");

    }
    const exercise=await Exercise.find({workoutId});
    if(!exercise){
        throw new ApiError(400,"Invalid WorkoutId")
    }
    res.status(200).json(new ApiResponse(200,exercise,"fetched succesfully"))
})
export{addExercise,getExercises}