const { z } = require('zod');

// Enums (following HomeLoan style)
const BATitleEnum = z.enum(['Mr', 'Mrs', 'Miss', 'Dr'], { error: 'Title is required' });
const BAGenderEnum = z.enum(['Male', 'Female'], { error: 'Gender is required' });
const BAMaritalStatusEnum = z.enum(['Unmarried', 'Married', 'Single'], { error: 'Marital status is required' });
const BAResidenceEnum = z.enum(['Own', 'Rented'], { error: 'Residence type is required' });
const BACountryEnum = z.enum(['India'], { error: 'Country is required' });
const BAOrgTypeEnum = z.enum(['proprietor', 'partnership', 'private_limited', 'other'], { error: 'Organization type is required' });
const BABusinessTypeEnum = z.enum(['Owned', 'Rented'], { error: 'Business type is required' });
const BAInterestedFieldEnum = z.enum(['HR', 'Fintech', 'Digital Marketing', 'Sales'], { error: 'Interested field is required' });
const BAStdCodeEnum = z.enum(['+91', '+1', '+44'], { error: 'STD code is required' });

const applyForBusinessAssociateSchema = z.object({
  title: BATitleEnum,
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
  stdCode: BAStdCodeEnum,
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),
  altStdCode: BAStdCodeEnum,
  altPhone: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Alternate phone must be string' : undefined }).optional(),
  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),
  gender: BAGenderEnum,
  residence: BAResidenceEnum,
  presentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Present address is required'
        : issue.code === 'invalid_type'
        ? 'Present address must be string'
        : undefined
  }).min(5, { error: 'Present address must be at least 5 characters' }),
  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
        : undefined
  }).min(5, { error: 'Permanent address must be at least 5 characters' }),
  landmark: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Landmark is required'
        : issue.code === 'invalid_type'
        ? 'Landmark must be string'
        : undefined
  }).optional(),
  city: z.string({
    error: issue =>
      issue.input === undefined
        ? 'City is required'
        : issue.code === 'invalid_type'
        ? 'City must be string'
        : undefined
  }).min(2, { error: 'City must be at least 2 characters' }),
  state: z.string({
    error: issue =>
      issue.input === undefined
        ? 'State is required'
        : issue.code === 'invalid_type'
        ? 'State must be string'
        : undefined
  }).min(2, { error: 'State must be at least 2 characters' }),
  pincode: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Pincode is required'
        : issue.code === 'invalid_type'
        ? 'Pincode must be string'
        : undefined
  }).regex(/^[1-9][0-9]{5}$/, { error: 'Enter a valid 6‑digit Indian pincode' }),
  country: BACountryEnum,
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
  maritalStatus: BAMaritalStatusEnum,
  spouseName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Spouse name must be string' : undefined }).optional(),
  childrenCount: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Children count must be string' : undefined }).optional(),
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
  interestedField: BAInterestedFieldEnum,
  organizationType: BAOrgTypeEnum,
  industry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Industry must be string' : undefined }).optional(),
  businessName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Business name is required'
        : issue.code === 'invalid_type'
        ? 'Business name must be string'
        : undefined
  }).min(2, { error: 'Business name must be at least 2 characters' }),
  businessType: BABusinessTypeEnum,
  businessAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Business address is required'
        : issue.code === 'invalid_type'
        ? 'Business address must be string'
        : undefined
  }).min(5, { error: 'Business address must be at least 5 characters' }),
  turnover: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Annual turnover is required'
        : issue.code === 'invalid_type'
        ? 'Annual turnover must be string'
        : undefined
  }).min(1, { error: 'Annual turnover is required' }),
  experience: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Experience is required'
        : issue.code === 'invalid_type'
        ? 'Experience must be string'
        : undefined
  }).min(1, { error: 'Experience is required' }),
  loanAmount: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Loan amount is required'
        : issue.code === 'invalid_type'
        ? 'Loan amount must be a number'
        : undefined
  }).min(1000, { error: 'Minimum loan amount is ₹1000' }),
  proposal: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Proposal is required'
        : issue.code === 'invalid_type'
        ? 'Proposal must be string'
        : undefined
  }).min(1, { error: 'Proposal is required' }).optional(),
  accountHolderName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Account holder name is required'
        : issue.code === 'invalid_type'
        ? 'Account holder name must be string'
        : undefined
  }).min(3, { error: 'Account holder name must be at least 3 characters' }),
  bankName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Bank name is required'
        : issue.code === 'invalid_type'
        ? 'Bank name must be string'
        : undefined
  }).min(3, { error: 'Bank name must be at least 3 characters' }),
  accountNumber: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Account number is required'
        : issue.code === 'invalid_type'
        ? 'Account number must be string'
        : undefined
  }).min(5, { error: 'Account number must be at least 5 characters' }),
  ifsc: z.string({
    error: issue =>
      issue.input === undefined
        ? 'IFSC code is required'
        : issue.code === 'invalid_type'
        ? 'IFSC code must be string'
        : undefined
  }).min(5, { error: 'IFSC code must be at least 5 characters' }),
  bankProof: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Bank statement is required'
        : issue.code === 'invalid_type'
        ? 'Bank statement must be string'
        : undefined
  }).min(1, { error: 'Bank statement is required' }),
  cancelledCheque: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Cancelled cheque is required'
        : issue.code === 'invalid_type'
        ? 'Cancelled cheque must be string'
        : undefined
  }).min(1, { error: 'Cancelled cheque is required' }),
  photo: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Photo is required'
        : issue.code === 'invalid_type'
        ? 'Photo must be string'
        : undefined
  }).min(1, { error: 'Photo is required' }),
  officePhotos: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Office photos are required'
        : issue.code === 'invalid_type'
        ? 'Office photos must be string'
        : undefined
  }),
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
  gst: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'GST must be string' : undefined }).optional(),
  msme: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'MSME must be string' : undefined }).optional(),
  rentAgreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Rent agreement must be string' : undefined }).optional(),
  electricityBill: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Electricity bill must be string' : undefined }).optional(),
  cin: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'CIN must be string' : undefined }).optional(),
  companyPan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company PAN must be string' : undefined }).optional(),
  companyTan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company TAN must be string' : undefined }).optional(),
  tradeLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Trade license must be string' : undefined }).optional(),
  deedagreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Deed agreement must be string' : undefined }).optional(),
  itr1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 1 must be string' : undefined }).optional(),
  itr2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 2 must be string' : undefined }).optional(),
  itr3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 3 must be string' : undefined }).optional(),
  computation1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation 1 must be string' : undefined }).optional(),
  computation2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation 2 must be string' : undefined }).optional(),
  computation3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation 3 must be string' : undefined }).optional(),
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
)
// Partnership deed required if organizationType is partnership
.refine(
  data => data.organizationType !== 'partnership' || (data.deedagreement?.trim() !== ''),
  { message: 'Partnership deed agreement is required for partnership organizations', path: ['deedagreement'] }
)
// Rent agreement required if businessType is Rented
.refine(
  data => data.businessType !== 'Rented' || (data.rentAgreement?.trim() !== ''),
  { message: 'Rent agreement is required for rented business type', path: ['rentAgreement'] }
);

module.exports = applyForBusinessAssociateSchema;