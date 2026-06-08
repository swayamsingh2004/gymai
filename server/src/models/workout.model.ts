import mongoose,{Schema} from "mongoose";
interface IWorkout{
    userId:mongoose.Types.ObjectId,
    muscleGroup:string,
    date:Date,
    duration:number,
    notes:string
}

const workoutSchema=new Schema<IWorkout>({
    userId:{ type:Schema.Types.ObjectId, ref:"User",required:true },
    muscleGroup:{
        type:String,
        required:true,

    },
    date:{
        type:Date,
        required:true

    },
    duration:{
        type:Number
    },
    notes:{
        type:String
    }

    
},{
    timestamps:true
})

export const Workout=mongoose.model("Workout",workoutSchema);