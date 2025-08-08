const { z } = require('zod');

// Enums with unified error
const TitleEnum = z.enum(['Mr', 'Mrs', 'Miss', 'Dr'], {
  error: 'Title is required'
});
const GenderEnum = z.enum(['Male', 'Female'], {
  error: 'Gender is required'
});
const MaritalStatusEnum = z.enum(['Unmarried', 'Married', 'Single'], {
  error: 'Marital status is required'
});
const ResidenceEnum = z.enum(['Own', 'Rented'], {
  error: 'Residence type is required'
});
const CountryEnum = z.enum(['India', 'USA', 'UK', 'Canada', 'Australia', 'Other'], {
  error: 'Country is required'
});
const EmploymentTypeEnum = z.enum(['Government', 'Private'], {
  error: 'Employment type is required'
});
const StdCodeEnum = z.enum(['+91', '+1', '+44'], {
  error: 'STD code is required'
});

const applyForPersonalLoanSchema = z.object({
  title: TitleEnum,
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

  stdCode: StdCodeEnum,
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),

  altStdCode: StdCodeEnum,
  altPhone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Alternate phone is required'
        : issue.code === 'invalid_type'
        ? 'Alternate phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid alternate number' }),

  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),

  gender: GenderEnum,
  residence: ResidenceEnum,

  presentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Present address is required'
        : issue.code === 'invalid_type'
        ? 'Present address must be string'
        : undefined
  }).min(5, { error: 'Present address must be at least 5 characters' }),

  landmark: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Landmark is required'
        : issue.code === 'invalid_type'
        ? 'Landmark must be string'
        : undefined
  }).min(2, { error: 'Landmark must be at least 2 characters' }),

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

  state: z.string({
    error: issue =>
      issue.input === undefined
        ? 'State is required'
        : issue.code === 'invalid_type'
        ? 'State must be string'
        : undefined
  }).min(2, { error: 'State must be at least 2 characters' }),

  country: CountryEnum,

  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
        : undefined
  }).min(5, { error: 'Permanent address must be at least 5 characters' }),

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

  maritalStatus: MaritalStatusEnum,

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

  aadhaar: z.string({
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

  income: z.coerce.number({ error: 'Monthly income is required' }).min(1000, { error: 'Monthly income must be at least ₹1000' }),

  employmentType: EmploymentTypeEnum,

  loanAmount: z.coerce.number({ error: 'Loan amount is required' }).min(1000, { error: 'Minimum loan amount is ₹1000' }),

  purpose: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Purpose is required'
        : issue.code === 'invalid_type'
        ? 'Purpose must be string'
        : undefined
  }).min(3, { error: 'Purpose must be at least 3 characters' }),

  organization: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Organization is required'
        : issue.code === 'invalid_type'
        ? 'Organization must be string'
        : undefined
  }).min(2, { error: 'Organization must be at least 2 characters' }),

  designation: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Designation is required'
        : issue.code === 'invalid_type'
        ? 'Designation must be string'
        : undefined
  }).min(2, { error: 'Designation must be at least 2 characters' }),

  department: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Department is required'
        : issue.code === 'invalid_type'
        ? 'Department must be string'
        : undefined
  }).optional(),

  profession: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Profession is required'
        : issue.code === 'invalid_type'
        ? 'Profession must be string'
        : undefined
  }).optional(),

  experienceYears: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Experience years is required'
        : issue.code === 'invalid_type'
        ? 'Experience years must be number'
        : undefined
  }),

  experienceMonths: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Experience months is required'
        : issue.code === 'invalid_type'
        ? 'Experience months must be number'
        : undefined
  }),
  
  salarySlip: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Salary slip URL is required'
        : issue.code === 'invalid_type'
        ? 'Salary slip must be string'
        : undefined
  }).min(1, { error: 'Salary slip URL is required' }),

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

  officialAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Official address is required'
        : issue.code === 'invalid_type'
        ? 'Official address must be string'
        : undefined
  }).min(5, { error: 'Official address must be at least 5 characters' }),

  officialLandmark: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Official landmark is required'
        : issue.code === 'invalid_type'
        ? 'Official landmark must be string'
        : undefined
  }).min(2, { error: 'Official landmark must be at least 2 characters' }),

  officialCity: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Official city is required'
        : issue.code === 'invalid_type'
        ? 'Official city must be string'
        : undefined
  }).min(2, { error: 'Official city must be at least 2 characters' }),

  officialPincode: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Official pincode is required'
        : issue.code === 'invalid_type'
        ? 'Official pincode must be string'
        : undefined
  }).regex(/^[1-9][0-9]{5}$/, { error: 'Valid pincode required' }),

  officialState: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Official state is required'
        : issue.code === 'invalid_type'
        ? 'Official state must be string'
        : undefined
  }).min(2, { error: 'Official state must be at least 2 characters' }),

  officialCountry: CountryEnum,

  officialEmail: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Official email is required'
        : issue.code === 'invalid_type'
        ? 'Official email must be string'
        : undefined
  }).email({ error: 'Official email is invalid' }),

  aadhaarFile: z.string({
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

  bankProof: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Bank proof is required'
        : issue.code === 'invalid_type'
        ? 'Bank proof must be string'
        : undefined
  }).min(1, { error: 'Bank proof is required' }),
})
// Marital status logic
.refine(
  data =>
    data.maritalStatus !== 'Married' ||
    (data.spouseName?.trim() !== ''),
  {
    message: 'Spouse name is required for married applicants',
    path: ['spouseName'],
  }
)
.refine(
  data =>
    data.maritalStatus !== 'Married' ||
    (/^\d+$/.test(data.childrenCount?.trim() || '')),
  {
    message: 'Children count is required for married applicants',
    path: ['childrenCount'],
  }
)
// Employment type logic
.refine(
  data =>
    data.employmentType !== 'Government' ||
    data.department?.trim() !== '',
  {
    message: 'Department is required for Government employees',
    path: ['department'],
  }
)
.refine(
  data =>
    data.employmentType !== 'Private' ||
    data.profession?.trim() !== '',
  {
    message: 'Profession is required for Private employees',
    path: ['profession'],
  }
)
// Same address logic: permanentAddress required if not same as present
.refine(
  data =>
    data.permanentAddress?.trim() !== '',
  {
    message: 'Permanent address is required',
    path: ['permanentAddress'],
  }
);

module.exports = applyForPersonalLoanSchema;