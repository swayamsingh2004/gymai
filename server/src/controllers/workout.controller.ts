import { Workout } from "../models/workout.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
const createWorkout=asyncHandler(async(req,res)=>{
    const{muscleGroup,date,duration,notes}=req.body;
    if([muscleGroup].some((field)=>field?.trim()=="")){
        throw new ApiError(400,"muscle Group is required");
    }
    if(!date || isNaN(new Date(date).getTime())){
        throw new ApiError(400, "Invalid date format")
    }
    const workout=await Workout.create({
        userId:req.user._id,
        muscleGroup:muscleGroup,
        date:date,
        duration:duration,
        notes:notes

    })
    return res.status(201).json(new ApiResponse(201,workout,"Workout Created"))
})

const getWorkouts=asyncHandler(async(req,res)=>{
    const userId = req.user._id
    if(!userId){
        throw new ApiError(400,"User Id not Found");
    }

    const Workouts= await Workout.find({userId}).sort({date:-1});
    
    return res.status(200).json(new ApiResponse(200,Workouts,"Fetch Done"))
    


})
const getWorkoutById=asyncHandler(async(req,res)=>{
    const workoutid=req.params.id;
    if(!workoutid){
        throw new ApiError(404,"Workout id not found");
        
    }
    const workout= await Workout.findById(workoutid);
    if(!workout){
        throw new ApiError(400,"Not a valid workout id");
    }
    res.status(200).json(new ApiResponse(200,workout,"Fetched"));
})

export{createWorkout,getWorkouts,getWorkoutById}
