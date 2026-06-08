import mongoose,{Schema} from "mongoose";

interface IExercise{
    workoutId:mongoose.Types.ObjectId,
    exerciseName:string,
    sets:{
        setNumber:number,
        reps:number,
        weight:number
    }[]

}

const exerciseSchema=new Schema<IExercise>({
    workoutId:{
        type:Schema.Types.ObjectId,
        ref:"Workout",
        required:true
    },
    exerciseName:{
        type:String,
        required:true
    },
    sets:[{
        setNumber:Number,
        reps:Number,
        weight:Number
    }]

})
export const Exercise=mongoose.model("Exercise",exerciseSchema)