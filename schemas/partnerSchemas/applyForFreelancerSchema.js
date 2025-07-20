const { z } = require('zod');

// Enums (following HomeLoan style)
const FreelancerTitleEnum = z.enum(['Mr', 'Mrs', 'Miss', 'Dr'], { error: 'Title is required' });
const FreelancerGenderEnum = z.enum(['Male', 'Female'], { error: 'Gender is required' });
const FreelancerMaritalStatusEnum = z.enum(['Unmarried', 'Married', 'Single'], { error: 'Marital status is required' });
const FreelancerResidenceEnum = z.enum(['Own', 'Rented'], { error: 'Residence type is required' });

const applyForFreelancerSchema = z.object({
  title: FreelancerTitleEnum,
  fullName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Full name is required'
        : issue.code === 'invalid_type'
        ? 'Full name must be string'
        : undefined
  }).min(3, { error: 'Full name must be at least 3 characters' }),

  email: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Email is required'
        : issue.code === 'invalid_type'
        ? 'Email must be string'
        : undefined
  }).email({ error: 'Invalid email address' }),

  stdCode: z.string({
    error: issue =>
      issue.input === undefined
        ? 'STD code is required'
        : issue.code === 'invalid_type'
        ? 'STD code must be string'
        : undefined
  }),

  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),

  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Date of birth is required'
        : issue.code === 'invalid_type'
        ? 'Date of birth must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),

  gender: FreelancerGenderEnum,

  maritalStatus: FreelancerMaritalStatusEnum,

  spouseName: z.string({
    error: issue =>
      issue.code === 'invalid_type'
        ? 'Spouse name must be string'
        : undefined
  }).optional(),

  childrenCount: z.string({
    error: issue =>
      issue.code === 'invalid_type'
        ? 'Children count must be string'
        : undefined
  }).optional(),

  fatherName: z.string({
    error: issue =>
      issue.input === undefined
        ? "Father's name is required"
        : issue.code === 'invalid_type'
        ? "Father's name must be string"
        : undefined
  }).min(3, { error: "Father's name must be at least 3 characters" }),

  motherName: z.string({
    error: issue =>
      issue.input === undefined
        ? "Mother's name is required"
        : issue.code === 'invalid_type'
        ? "Mother's name must be string"
        : undefined
  }).min(3, { error: "Mother's name must be at least 3 characters" }),

  aadhar: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Aadhaar is required'
        : issue.code === 'invalid_type'
        ? 'Aadhaar must be string'
        : undefined
  }).regex(/^\d{12}$/, { error: 'Aadhaar must be 12 digits' }),

  pan: z.string({
    error: issue =>
      issue.input === undefined
        ? 'PAN is required'
        : issue.code === 'invalid_type'
        ? 'PAN must be string'
        : undefined
  }).regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, { error: 'Invalid PAN format' }),

  residence: FreelancerResidenceEnum,

  landmark: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Landmark is required'
        : issue.code === 'invalid_type'
        ? 'Landmark must be string'
        : undefined
  }).optional(),

  state: z.string({
    error: issue =>
      issue.input === undefined
        ? 'State is required'
        : issue.code === 'invalid_type'
        ? 'State must be string'
        : undefined
  }).min(2, { error: 'State must be at least 2 characters' }),

  city: z.string({
    error: issue =>
      issue.input === undefined
        ? 'City is required'
        : issue.code === 'invalid_type'
        ? 'City must be string'
        : undefined
  }).min(2, { error: 'City must be at least 2 characters' }),

  pincode: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Pincode is required'
        : issue.code === 'invalid_type'
        ? 'Pincode must be string'
        : undefined
  }).regex(/^[1-9][0-9]{5}$/, { error: 'Enter a valid 6‑digit Indian pincode' }),

  country: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Country is required'
        : issue.code === 'invalid_type'
        ? 'Country must be string'
        : undefined
  }).min(2, { error: 'Country must be at least 2 characters' }),

  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
        : undefined
  }).min(5, { error: 'Permanent address must be at least 5 characters' }),

  presentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Present address is required'
        : issue.code === 'invalid_type'
        ? 'Present address must be string'
        : undefined
  }).min(5, { error: 'Present address must be at least 5 characters' }),

  skills: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Skills are required'
        : issue.code === 'invalid_type'
        ? 'Skills must be string'
        : undefined
  }).min(2, { error: 'Skills must be at least 2 characters' }),

  experience: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Experience is required'
        : issue.code === 'invalid_type'
        ? 'Experience must be string'
        : undefined
  }).min(1, { error: 'Experience is required' }),

  interestedField: z.enum(['HR', 'Fintech', 'Digital Marketing', 'Sales'], {
    error: 'Interested field is required'
  }),

  portfolio: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Portfolio URL is required'
        : issue.code === 'invalid_type'
        ? 'Portfolio must be string'
        : undefined
  }).url({ error: 'Portfolio must be a valid URL' }).optional(),

  resume: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Resume is required'
        : issue.code === 'invalid_type'
        ? 'Resume must be string'
        : undefined
  }).min(1, { error: 'Resume is required' }),

  aadharFile: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Aadhaar file is required'
        : issue.code === 'invalid_type'
        ? 'Aadhaar file must be string'
        : undefined
  }).min(1, { error: 'Aadhaar file is required' }),

  panFile: z.string({
    error: issue =>
      issue.input === undefined
        ? 'PAN file is required'
        : issue.code === 'invalid_type'
        ? 'PAN file must be string'
        : undefined
  }).min(1, { error: 'PAN file is required' }),

  photo: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Photo is required'
        : issue.code === 'invalid_type'
        ? 'Photo must be string'
        : undefined
  }).min(1, { error: 'Photo is required' }),

  bankPassbook: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Bank passbook is required'
        : issue.code === 'invalid_type'
        ? 'Bank passbook must be string'
        : undefined
  }).min(1, { error: 'Bank passbook is required' }),
})
// Marital status logic
.refine(
  data => data.maritalStatus !== 'Married' || (data.spouseName?.trim() !== ''),
  { message: 'Spouse name is required for married applicants', path: ['spouseName'] }
)
.refine(
  data => data.maritalStatus !== 'Married' || (/^\d+$/.test(data.childrenCount?.trim() || '')),
  { message: 'Children count is required for married applicants', path: ['childrenCount'] }
)
// Same address logic: permanentAddress required if not same as present
.refine(
  data => data.permanentAddress?.trim() !== '',
  { message: 'Permanent address is required', path: ['permanentAddress'] }
);

module.exports = applyForFreelancerSchema;