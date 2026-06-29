import * as z from "zod";

const WorkoutSchema = z.object({
  muscleGroup: z.string().trim(),
 
  notes: z.string().trim().optional(),
  duration: z.coerce.number().min(0).optional(),
  date: z.coerce.date(),
});

export { WorkoutSchema };
