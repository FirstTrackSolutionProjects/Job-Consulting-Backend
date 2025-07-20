const { z } = require('zod');

const CreditCardFormSchema = z.object({
  name: z.string({
    error: issue =>
      issue.input === undefined
        ? "Full name is required"
        : issue.code === "invalid_type"
        ? "Full name must be string"
        : undefined
  }).min(3, { error: "Full name must be at least 3 characters" }),
  email: z.string({
    error: issue =>
      issue.input === undefined
        ? "Email is required"
        : issue.code === "invalid_type"
        ? "Email must be string"
        : undefined
  }).email({ message: "Invalid email address" }),
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? "Phone number is required"
        : issue.code === "invalid_type"
        ? "Phone number must be string"
        : undefined
  }).min(8, { error: "Phone number must be at least 8 digits" }),
  message: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Message must be string"
        : undefined
  }).optional(),
});

module.exports = CreditCardFormSchema;