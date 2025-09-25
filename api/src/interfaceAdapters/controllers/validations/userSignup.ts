import { z } from "zod";

import { strongEmailRegex } from "../../../shared/validation/emailValidation";
import { passwordSchema } from "../../../shared/validation/passwordValidation";
import { nameSchema } from "../../../shared/validation/nameValidation";
import { phoneNumberSchema } from "../../../shared/validation/phoneValidation";


// Signup schema for "client" , "vendor" and "admin"
const commonSchema = {
  name: nameSchema,
  email: strongEmailRegex,
  phone: phoneNumberSchema,
  password: passwordSchema
};

const userSignupSchema = z.object({
  ...commonSchema,
  role: z.literal("client")
});

const vendorSignupSchema = z.object({
  ...commonSchema,
  idProof: z.string().min(1, "ID proof is required"),
  role: z.literal("vendor")
});

const adminSignupSchema = z.object({
  ...commonSchema,
  role: z.literal("admin")
});

export const signupSchemas = {
  client: userSignupSchema,
  vendor: vendorSignupSchema,
  admin: adminSignupSchema
};


// Login schema for "client" , "vendor" and "admin"
export const loginSchema = z.object({
  email: strongEmailRegex,
  password: z.string().min(1, "password Required"),
  role: z.enum(["admin", "client", "vendor"])
})


