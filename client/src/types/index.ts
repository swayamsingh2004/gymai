export interface IUser{
    _id:string,
    username:string,
    email:string
}
export interface IWorkout{
    _id:string,
    userId:string,
    muscleGroup:string,
    date:Date,
    duration:number,
    notes:string
}
export interface IExercise{
    _id:string,
    workoutid:string,
    exerciseName:string,
    sets:{
        setNumber:number,
        reps:number,
        weight:number
    }[]
}
export interface ISet{
    setNumber:number,
    reps:number,
    weight:number
}