import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const verifyCodeSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: 'Invalid email address' })
});