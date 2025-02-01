import { z } from "zod";
import { userSchema } from "./userSchema";

export const noteSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userSchema,
    task: z.string()
});