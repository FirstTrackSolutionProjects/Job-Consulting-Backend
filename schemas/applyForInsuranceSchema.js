const { z } = require('zod');

const GenderEnum = z.enum(['Male', 'Female', 'Other'], { error: 'Gender is required' });
const InsuranceTypeEnum = z.enum(
  ['Health Insurance', 'Life Insurance', 'Vehicle Insurance', 'Travel Insurance', 'Other'],
  { error: 'Insurance type is required' }
);

const applyForInsuranceSchema = z.object({
  fullName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Full name is required'
        : issue.code === 'invalid_type'
        ? 'Full name must be string'
        : undefined
  }).min(3, { error: 'Full name must be at least 3 characters' }),

  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Date of birth is required'
        : issue.code === 'invalid_type'
        ? 'Date of birth must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),

  email: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Email is required'
        : issue.code === 'invalid_type'
        ? 'Email must be string'
        : undefined
  }).email({ error: 'Invalid email address' }),

  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),

  gender: GenderEnum,

  address: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Address is required'
        : issue.code === 'invalid_type'
        ? 'Address must be string'
        : undefined
  }).min(5, { error: 'Address must be at least 5 characters' }),

  insuranceType: InsuranceTypeEnum,

  nomineeName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Nominee name is required'
        : issue.code === 'invalid_type'
        ? 'Nominee name must be string'
        : undefined
  }).min(3, { error: 'Nominee name must be at least 3 characters' }),

  nomineeRelation: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Nominee relation is required'
        : issue.code === 'invalid_type'
        ? 'Nominee relation must be string'
        : undefined
  }).min(2, { error: 'Nominee relation must be at least 2 characters' }),

  idProof: z.string({
    error: issue =>
      issue.input === undefined
        ? 'ID proof is required'
        : issue.code === 'invalid_type'
        ? 'ID proof must be string'
        : undefined
  }).min(1, { error: 'ID proof is required' }),

  photo: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Photo is required'
        : issue.code === 'invalid_type'
        ? 'Photo must be string'
        : undefined
  }).min(1, { error: 'Photo is required' }),
});

module.exports = applyForInsuranceSchema;