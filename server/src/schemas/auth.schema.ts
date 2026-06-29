import * as z from "zod";

 const RegisterSchema = z.object({
  username: z.string().min(3).max(100).trim(),
  email: z.string().trim().email(),
  password: z.string().min(8).max(100).trim(),
  
  
});
const loginSchema=z.object({
    email:z.string().trim().email(),
    password:z.string().min(8).max(100).trim(),
})
export { RegisterSchema, loginSchema };
