const { z } = require('zod');

// Enums for Credit Card
const CreditCardStdCodeEnum = z.enum(['+91'], { error: 'STD code is required' });
const CreditCardProfessionEnum = z.enum(['Business', 'Service'], { error: 'Profession is required' });

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
  }).email({ error: "Invalid email address" }),
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? "Phone number is required"
        : issue.code === "invalid_type"
        ? "Phone number must be string"
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: "Enter valid 10‑digit Indian mobile number" }),
  stdCode: CreditCardStdCodeEnum,
  profession: CreditCardProfessionEnum,
  // Business fields
  businessName: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Business name must be string"
        : undefined
  }).optional(),
  yearsInBusiness: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Years in business must be string"
        : undefined
  }).optional(),
  // Service fields
  companyName: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Company name must be string"
        : undefined
  }).optional(),
  // File fields
  photo: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Photo must be string"
        : undefined
  }).optional(),
  aadhaar: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Aadhaar must be string"
        : undefined
  }).optional(),
  pan: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "PAN must be string"
        : undefined
  }).optional(),
  salaryslip: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Salary slip must be string"
        : undefined
  }).optional(),
  itr1: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "ITR 1 must be string"
        : undefined
  }).optional(),
  itr2: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "ITR 2 must be string"
        : undefined
  }).optional(),
  computation1: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Computation 1 must be string"
        : undefined
  }).optional(),
  computation2: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Computation 2 must be string"
        : undefined
  }).optional(),
  message: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === "invalid_type"
        ? "Message must be string"
        : undefined
  }).optional(),
})
// Business section conditional validations
.refine(
  data => data.profession !== 'Business' || (data.businessName?.trim() !== ''),
  { message: 'Business name is required for business applicants', path: ['businessName'] }
)
.refine(
  data => data.profession !== 'Business' || (data.yearsInBusiness?.trim() !== ''),
  { message: 'Years in business is required for business applicants', path: ['yearsInBusiness'] }
)
.refine(
  data => data.profession !== 'Business' || (data.itr1?.trim() !== ''),
  { message: 'ITR Year 1 is required for business applicants', path: ['itr1'] }
)
.refine(
  data => data.profession !== 'Business' || (data.computation1?.trim() !== ''),
  { message: 'Computation Year 1 is required for business applicants', path: ['computation1'] }
)
// Service section conditional validations
.refine(
  data => data.profession !== 'Service' || (data.companyName?.trim() !== ''),
  { message: 'Company name is required for service applicants', path: ['companyName'] }
)
.refine(
  data => data.profession !== 'Service' || (data.salaryslip?.trim() !== ''),
  { message: 'Salary slip is required for service applicants', path: ['salaryslip'] }
);

module.exports = CreditCardFormSchema;