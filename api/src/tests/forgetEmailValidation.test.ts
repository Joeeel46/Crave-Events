import { forgotEmailValidationSchema } from "../interfaceAdapters/controllers/validations/forgot-password";
import { ERROR_MESSAGES } from "../shared/constants";

describe("Forgot Email Validation Schema (admin, client, vendor)", () => {
  test("✅ Should pass with a valid email and role (admin)", () => {
    const validData = {
      email: "test@example.com",
      role: "admin",
    };

    expect(() => forgotEmailValidationSchema.parse(validData)).not.toThrow();
  });

  test("✅ Should pass with a valid email and role (client)", () => {
    const validData = {
      email: "client@example.com",
      role: "client",
    };

    expect(() => forgotEmailValidationSchema.parse(validData)).not.toThrow();
  });

  test("✅ Should pass with a valid email and role (vendor)", () => {
    const validData = {
      email: "vendor@example.com",
      role: "vendor",
    };

    expect(() => forgotEmailValidationSchema.parse(validData)).not.toThrow();
  });

  test("❌ Should fail if email is missing", () => {
    const invalidData = {
      role: "admin",
    };

    expect(() => forgotEmailValidationSchema.parse(invalidData)).toThrow();
  });

  test("❌ Should fail if role is invalid", () => {
    const invalidData = {
      email: "test@example.com",
      role: "manager", // Invalid role
    };

    expect(() =>
      forgotEmailValidationSchema.parse(invalidData)
    ).toThrow(ERROR_MESSAGES.INVALID_ROLE);
  });

  test("❌ Should fail if email format is incorrect", () => {
    const invalidData = {
      email: "invalid-email",
      role: "vendor",
    };

    expect(() => forgotEmailValidationSchema.parse(invalidData)).toThrow();
  });
});
