import * as z from "zod";
const setSchema = z.object({
    setNumber: z.coerce.number(),
    reps: z.coerce.number().min(1),
    weight: z.coerce.number().min(2.5)
})
const exerciseSchema=z.object({
    workoutId:z.string().regex(/^[a-f\d]{24}$/i),
    exerciseName:z.string().min(2).max(100).trim(),

    sets:z.array(setSchema)
})
export { exerciseSchema };