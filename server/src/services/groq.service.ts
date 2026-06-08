
import Groq from "groq-sdk";

import { ApiError } from "../utils/ApiError";
const groq = new Groq({apiKey:process.env.GROQ_API_KEY})
export async function analyzeWorkouts(workouts:any[]){
    const workout=JSON.stringify(workouts);
    if(!workout){
        throw new ApiError(400,"Not a Valid Input");
    }
    const prompt=`You are an expert strength coach and exercise scientist.
    I will provide my workout history in the form of an array. Each entry contains:
                Exercise name
                Number of sets
                Number of reps
                Day performed${workout}
    Analyze all exercises and identify the primary and secondary muscle groups trained.
Calculate the approximate weekly training volume (total sets) for each major muscle group:
Chest
Front/Side/Rear Delts
Triceps
Biceps
Lats
Upper Back
Traps
Quads
Hamstrings
Glutes
Calves
Core/Abs
Lower Back
Forearms
Answer the following:
Which muscle groups am I neglecting?
Which muscle groups may be undertrained relative to the rest of my program?
Am I overtraining or disproportionately training any muscle groups?
Are there any major movement patterns missing (horizontal push, vertical push, horizontal pull, vertical pull, squat, hinge, carry, core)?
Is my push-pull-leg balance reasonable?
Are there any recovery concerns based on training frequency and volume?
Suggest improvements for next week:
Exercises to add
Exercises to remove or reduce
Volume adjustments (sets per muscle group)
Recommended training frequency
Any imbalance corrections
    


    `
const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 1000
})

return response.choices[0]?.message?.content || ""

}
