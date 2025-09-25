
import { ERROR_MESSAGES } from "../../../shared/constants";
import { strongEmailRegex } from "../../../shared/validation/emailValidation";
import {z} from "zod";

export const forgotEmailValidationSchema = z.object({
    email:strongEmailRegex,
    role:z.enum(["admin", "client", "vendor"],{
        message:ERROR_MESSAGES.INVALID_ROLE
    }),
})