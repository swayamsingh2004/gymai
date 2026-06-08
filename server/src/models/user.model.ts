import mongoose,{Schema} from "mongoose";
interface IUser {
  username: string
  email: string
  password: string
  weight?: number
  height?: number
  targetWeight?: number
}
const userSchema = new Schema<IUser>({
    username:{
        type:String,
        required:true
        

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    weight:{
        type:Number
    },
    height:{
        type:Number
    },
    targetWeight:{
        type:Number
    }
}, {
    timestamps:true
})

export const User = mongoose.model("User", userSchema);
