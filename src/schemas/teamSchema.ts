import { z } from "zod";
import { userSchema } from "./userSchema";

export const teamMemberSchema= userSchema.pick({
    _id: true,
    name: true,
    email: true
});

export const teamMembersSchema = z.array(teamMemberSchema);