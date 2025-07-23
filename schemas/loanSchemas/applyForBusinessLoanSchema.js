const { z } = require('zod');

// Business Loan Enums (unique to this schema)
const BusinessLoanTitleEnum = z.enum(['Mr', 'Mrs', 'Miss', 'Dr'], { error: 'Title is required' });
const BusinessLoanGenderEnum = z.enum(['Male', 'Female'], { error: 'Gender is required' });
const BusinessLoanMaritalStatusEnum = z.enum(['Unmarried', 'Married', 'Single'], { error: 'Marital status is required' });
const BusinessLoanResidenceEnum = z.enum(['Own', 'Rented'], { error: 'Residence type is required' });
const BusinessLoanCountryEnum = z.enum(['India'], { error: 'Country is required' });
const BusinessLoanBusinessCountryEnum = z.enum(['India'], { error: 'Business country is required' });
const BusinessLoanOrgTypeEnum = z.enum(['proprietor', 'partnership', 'private_limited', 'other'], { error: 'Organization type is required' });
const BusinessLoanBusinessTypeEnum = z.enum(['Owned', 'Rented'], { error: 'Business type is required' });
const BusinessLoanStdCodeEnum = z.enum(['+91', '+1', '+44'], { error: 'STD code is required' });

const businessLoanSchema = z.object({
  title: BusinessLoanTitleEnum,
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
  stdCode: BusinessLoanStdCodeEnum,
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),
  altStdCode: BusinessLoanStdCodeEnum,
  altPhone: z.string().optional(),
  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),
  gender: BusinessLoanGenderEnum,
  maritalStatus: BusinessLoanMaritalStatusEnum,
  spouseName: z.string().optional(),
  childrenCount: z.string().optional(),
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
  residence: BusinessLoanResidenceEnum,
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
  landmark: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Landmark is required'
        : issue.code === 'invalid_type'
        ? 'Landmark must be string'
        : undefined
  }).min(2, { error: 'Landmark must be at least 2 characters' }),
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
  country: BusinessLoanCountryEnum,
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
  organizationType: BusinessLoanOrgTypeEnum,
  industry: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Industry is required'
        : issue.code === 'invalid_type'
        ? 'Industry must be string'
        : undefined
  }).min(2, { error: 'Industry must be at least 2 characters' }),
  businessName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Business name is required'
        : issue.code === 'invalid_type'
        ? 'Business name must be string'
        : undefined
  }).min(2, { error: 'Business name must be at least 2 characters' }),
  businessType: BusinessLoanBusinessTypeEnum,
  businessAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Business address is required'
        : issue.code === 'invalid_type'
        ? 'Business address must be string'
        : undefined
  }).min(5, { error: 'Business address must be at least 5 characters' }),
  businessState: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Business State must be string'
        : undefined
  }).min(2, { error: 'Business State must be at least 2 characters' }).optional(),
  businessCity: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Business City must be string'
        : undefined
  }).min(2, { error: 'Business City must be at least 2 characters' }).optional(),
  businessPincode: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Business pincode must be string'
        : undefined
  }).optional(),
  businessCountry: BusinessLoanBusinessCountryEnum.optional(),
  turnover: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Annual turnover is required'
        : issue.code === 'invalid_type'
        ? 'Annual turnover must be a number'
        : undefined
  }).min(10000, { error: 'Turnover must be at least ₹10,000' }),
  years: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Years in business is required'
        : issue.code === 'invalid_type'
        ? 'Years in business must be a number'
        : undefined
  }).min(0, { error: 'Years in business must be 0 or more' }),
  loanAmount: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Loan amount is required'
        : issue.code === 'invalid_type'
        ? 'Loan amount must be a number'
        : undefined
  }).min(1000, { error: 'Minimum loan amount is ₹1000' }),
  purpose: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Purpose is required'
        : issue.code === 'invalid_type'
        ? 'Purpose must be string'
        : undefined
  }).min(3, { error: 'Purpose must be at least 3 characters' }),
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
  photo: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Photo is required'
        : issue.code === 'invalid_type'
        ? 'Photo must be string'
        : undefined
  }).min(1, { error: 'Photo is required' }),
  officePhoto1: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Office photo 1 is required'
        : issue.code === 'invalid_type'
        ? 'Office photo 1 must be string'
        : undefined
  }).min(1, { error: 'Office photo 1 is required' }),
  officePhoto2: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Office photo 2 is required'
        : issue.code === 'invalid_type'
        ? 'Office photo 2 must be string'
        : undefined
  }).min(1, { error: 'Office photo 2 is required' }),
  officePhoto3: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Office photo 3 is required'
        : issue.code === 'invalid_type'
        ? 'Office photo 3 must be string'
        : undefined
  }).min(1, { error: 'Office photo 3 is required' }),
  officePhoto4: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Office photo 4 is required'
        : issue.code === 'invalid_type'
        ? 'Office photo 4 must be string'
        : undefined
  }).min(1, { error: 'Office photo 4 is required' }),
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
  gst: z.string({
    error: issue => 
        issue.input === undefined
          ? undefined
          : issue.code === 'invalid_type'
          ? 'GST must be string'
          : undefined
  }).optional(),
  msme: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'MSME must be string'
        : undefined
  }).optional(),
  rentAgreement: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Rent agreement must be string'
        : undefined
  }).optional(),
  electricityBill: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Electricity bill must be string'
        : undefined
  }).optional(),
  cin: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'CIN must be string'
        : undefined
  }).optional(),
  companyPan: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Company PAN must be string'
        : undefined
  }).optional(),
  companyTan: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Company TAN must be string'
        : undefined
  }).optional(),
  tradeLicense: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Trade license must be string'
        : undefined
  }).optional(),
  foodLicense: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Food license must be string'
        : undefined
  }).optional(),
  drugLicense: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Drug license must be string'
        : undefined
  }).optional(),
  bankStatementsCurrentYear1: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Bank statement (current year) must be string'
        : undefined
  }).optional(),
  bankStatementsCCYear1: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Bank statement (CC year) must be string'
        : undefined
  }).optional(),
  deedagreement: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Deed agreement must be string'
        : undefined
  }).optional(),
  itr1: z.string({
    error: issue =>
      issue.input === undefined
        ? 'ITR Year 1 is required'
        : issue.code === 'invalid_type'
        ? 'ITR Year 1 must be string'
        : undefined
  }).min(1, { error: 'ITR Year 1 is required' }),
  itr2: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'ITR Year 2 must be string'
        : undefined
  }).optional(),
  itr3: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'ITR Year 3 must be string'
        : undefined
  }).optional(),
  computation1: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Computation Year 1 is required'
        : issue.code === 'invalid_type'
        ? 'Computation Year 1 must be string'
        : undefined
  }).min(1, { error: 'Computation Year 1 is required' }),
  computation2: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Computation Year 2 must be string'
        : undefined
  }).optional(),
  computation3: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Computation Year 3 must be string'
        : undefined
  }).optional(),
})
// Conditional refines
.refine(
  data => data.maritalStatus !== 'Married' || (data.spouseName?.trim() !== ''),
  { message: 'Spouse name is required for married applicants', path: ['spouseName'] }
)
.refine(
  data => data.maritalStatus !== 'Married' || (/^\d+$/.test(data.childrenCount?.trim() || '')),
  { message: 'Children count is required for married applicants', path: ['childrenCount'] }
)
.refine(
  data => data.businessType !== 'Rented' || (data.rentAgreement?.trim() !== ''),
  { message: 'Rent agreement is required for rented business type', path: ['rentAgreement'] }
)
.refine(
  data => data.organizationType !== 'private_limited' || (data.cin?.trim() && data.companyPan?.trim() && data.companyTan?.trim()),
  { message: 'CIN, Company PAN, and Company TAN are required for Private Limited companies', path: ['cin', 'companyPan', 'companyTan'] }
)
.refine(
  data => data.organizationType !== 'partnership' || (data.deedagreement?.trim() !== ''),
  { message: 'Partnership deed is required for partnership firms', path: ['deedagreement'] }
);

module.exports = businessLoanSchema;