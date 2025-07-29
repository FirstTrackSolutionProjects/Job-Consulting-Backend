const { z } = require('zod');

// Unique Enums for Used Car Loan
const UsedCarLoanTitleEnum = z.enum(['Mr', 'Mrs', 'Miss', 'Dr'], { error: 'Title is required' });
const UsedCarLoanGenderEnum = z.enum(['Male', 'Female'], { error: 'Gender is required' });
const UsedCarLoanMaritalStatusEnum = z.enum(['Unmarried', 'Married', 'Single'], { error: 'Marital status is required' });
const UsedCarLoanResidenceEnum = z.enum(['Own', 'Rented'], { error: 'Residence type is required' });
const UsedCarLoanCountryEnum = z.enum(['India'], { error: 'Country is required' });
const UsedCarLoanStdCodeEnum = z.enum(['+91'], { error: 'STD code is required' });
const UsedCarLoanAltStdCodeEnum = z.enum(['+91', '+1', '+44'], { error: 'STD code is required' });
const UsedCarLoanProfessionEnum = z.enum(['Business', 'Service', 'None'], { error: 'Profession is required' });
const UsedCarLoanProfessionTypeBusinessEnum = z.enum(['Retail', 'Manufacturing', 'Freelancer', 'IT Consulting', 'Media', 'Internet', 'Other'], { error: 'Profession type is required' });
const UsedCarLoanProfessionTypeServiceEnum = z.enum(['Private Job', 'Government Job', 'Other'], { error: 'Service type is required' });
const UsedCarLoanBusinessTypeEnum = z.enum(['own', 'rented'], { error: 'Business type is required' });
const UsedCarLoanOrganizationTypeEnum = z.enum(['proprietor', 'partnership', 'private_limited', 'other'], { error: 'Organization type is required' });

const usedCarLoanSchema = z.object({
  title: UsedCarLoanTitleEnum,
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
  stdCode: UsedCarLoanStdCodeEnum,
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),
  altStdCode: UsedCarLoanAltStdCodeEnum,
  altPhone: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Alternate phone must be string' : undefined }).optional(),
  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),
  gender: UsedCarLoanGenderEnum,
  maritalStatus: UsedCarLoanMaritalStatusEnum,
  spouseName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Spouse name must be string' : undefined }).optional(),
  childrenCount: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Children count must be string' : undefined }).optional(),
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
  residence: UsedCarLoanResidenceEnum,
  presentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Present address is required'
        : issue.code === 'invalid_type'
        ? 'Present address must be string'
        : undefined
  }).min(5, { error: 'Present address must be at least 5 characters' }),
  landmark: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Landmark must be string' : undefined }).optional(),
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
  country: UsedCarLoanCountryEnum,
  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
        : undefined
  }).min(5, { error: 'Permanent address must be at least 5 characters' }),
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
  profession: UsedCarLoanProfessionEnum,
  professionType: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Profession type must be string' : undefined }).optional(),
  organizationType: UsedCarLoanOrganizationTypeEnum.optional(),
  businessType: UsedCarLoanBusinessTypeEnum.optional(),
  industry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Industry must be string' : undefined }).optional(),
  businessName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business name must be string' : undefined }).optional(),
  businessYears: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business years must be string' : undefined }).optional(),
  businessannualturnover: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business annual turnover must be string' : undefined }).optional(),
  businessAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business address must be string' : undefined }).optional(),
  businessCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business city must be string' : undefined }).optional(),
  businessPincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business pincode must be string' : undefined }).optional(),
  businessState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business state must be string' : undefined }).optional(),
  businessCountry: UsedCarLoanCountryEnum.optional(),
  companyName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company name must be string' : undefined }).optional(),
  jobYears: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Job years must be string' : undefined }).optional(),
  monthlyIncome: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Monthly income must be string' : undefined }).optional(),
  officeAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office address must be string' : undefined }).optional(),
  officeCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office city must be string' : undefined }).optional(),
  officePincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office pincode must be string' : undefined }).optional(),
  officeState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office state must be string' : undefined }).optional(),
  officeCountry: UsedCarLoanCountryEnum.optional(),
  carModel: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Car model is required'
        : issue.code === 'invalid_type'
        ? 'Car model must be string'
        : undefined
  }).min(2, { error: 'Car model must be at least 2 characters' }),
  carYear: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Car year is required'
        : issue.code === 'invalid_type'
        ? 'Car year must be string'
        : undefined
  }).min(2, { error: 'Car year must be at least 2 characters' }),
  carPrice: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Car price is required'
        : issue.code === 'invalid_type'
        ? 'Car price must be a number'
        : undefined
  }).min(10000, { error: 'Car price must be at least ₹10,000' }),
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
  // File fields
  photo: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Photo must be string' : undefined }).optional(),
  aadharFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Aadhaar file must be string' : undefined }).optional(),
  panFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'PAN file must be string' : undefined }).optional(),
  bankProof: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank proof must be string' : undefined }).optional(),
  quotations: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Quotations must be string' : undefined }).optional(),
  incomeproof: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Income proof must be string' : undefined }).optional(),
  gst: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'GST must be string' : undefined }).optional(),
  msme: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'MSME must be string' : undefined }).optional(),
  cin: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'CIN must be string' : undefined }).optional(),
  companypan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company PAN must be string' : undefined }).optional(),
  companytan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company TAN must be string' : undefined }).optional(),
  electricityBill: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Electricity bill must be string' : undefined }).optional(),
  rentagreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Rent agreement must be string' : undefined }).optional(),
  tradeLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Trade license must be string' : undefined }).optional(),
  foodLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Food license must be string' : undefined }).optional(),
  drugLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Drug license must be string' : undefined }).optional(),
  bankStatementsCurrentYear1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank statement (current year) must be string' : undefined }).optional(),
  bankStatementsCCYear1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank statement (CC year) must be string' : undefined }).optional(),
  bankStatementsCurrent: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank statements (current) must be string' : undefined }).optional(),
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
// Business section required fields
.refine(
  data => data.profession !== 'Business' || (data.professionType?.trim() !== ''),
  { message: 'Profession type is required for business applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Business' || (data.organizationType !== undefined && data.organizationType !== ''),
  { message: 'Organization type is required for business applicants', path: ['organizationType'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessType !== undefined && data.businessType !== ''),
  { message: 'Business type is required for business applicants', path: ['businessType'] }
)
.refine(
  data => data.profession !== 'Business' || (data.industry?.trim() !== ''),
  { message: 'Industry is required for business applicants', path: ['industry'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessName?.trim() !== ''),
  { message: 'Business name is required for business applicants', path: ['businessName'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessYears?.trim() !== ''),
  { message: 'Business years is required for business applicants', path: ['businessYears'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessannualturnover?.trim() !== ''),
  { message: 'Business annual turnover is required for business applicants', path: ['businessannualturnover'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessAddress?.trim() !== ''),
  { message: 'Business address is required for business applicants', path: ['businessAddress'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessCity?.trim() !== ''),
  { message: 'Business city is required for business applicants', path: ['businessCity'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessPincode?.trim() !== ''),
  { message: 'Business pincode is required for business applicants', path: ['businessPincode'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessState?.trim() !== ''),
  { message: 'Business state is required for business applicants', path: ['businessState'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessCountry !== undefined && data.businessCountry !== ''),
  { message: 'Business country is required for business applicants', path: ['businessCountry'] }
)
// Service section required fields
.refine(
  data => data.profession !== 'Service' || (data.professionType?.trim() !== ''),
  { message: 'Profession type is required for service applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Service' || (data.companyName?.trim() !== ''),
  { message: 'Company name is required for service applicants', path: ['companyName'] }
)
.refine(
  data => data.profession !== 'Service' || (data.jobYears?.trim() !== ''),
  { message: 'Job years is required for service applicants', path: ['jobYears'] }
)
.refine(
  data => data.profession !== 'Service' || (data.monthlyIncome?.trim() !== ''),
  { message: 'Monthly income is required for service applicants', path: ['monthlyIncome'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeAddress?.trim() !== ''),
  { message: 'Office address is required for service applicants', path: ['officeAddress'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeCity?.trim() !== ''),
  { message: 'Office city is required for service applicants', path: ['officeCity'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officePincode?.trim() !== ''),
  { message: 'Office pincode is required for service applicants', path: ['officePincode'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeState?.trim() !== ''),
  { message: 'Office state is required for service applicants', path: ['officeState'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeCountry !== undefined && data.officeCountry !== ''),
  { message: 'Office country is required for service applicants', path: ['officeCountry'] }
)
// Partnership deed required if organizationType is partnership
.refine(
  data => data.organizationType !== 'partnership' || (data.deedagreement?.trim() !== ''),
  { message: 'Partnership deed agreement is required for partnership organizations', path: ['deedagreement'] }
)
// Rent agreement required if businessType is rented
.refine(
  data => data.businessType !== 'rented' || (data.rentagreement?.trim() !== ''),
  { message: 'Rent agreement is required for rented business type', path: ['rentagreement'] }
);

module.exports = usedCarLoanSchema;