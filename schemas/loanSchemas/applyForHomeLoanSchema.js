const { z } = require('zod');
const { TITLES, GENDERS, MARITAL_STATUS, RESIDENCE_OWNERSHIP_TYPES, HOME_LOAN_COUNTRIES, HOME_LOAN_STD_CODES, HOME_LOAN_PROFESSIONS, BUSINESS_PROFESSION_TYPES, SERVICE_PROFESSION_TYPES, BUSINESS_ORGANIZATION_TYPES, BUSINESS_OWNERSHIP_TYPES } = require('../../constants');


// Unique Enums for Home Loan
const HomeLoanTitleEnum = z.enum(TITLES, { error: 'Title is required' });
const HomeLoanGenderEnum =  z.enum(GENDERS, { error: 'Gender is required' });
const HomeLoanMaritalStatusEnum =  z.enum(MARITAL_STATUS, { error: 'Marital status is required' });
const HomeLoanResidenceEnum = z.enum(RESIDENCE_OWNERSHIP_TYPES, { error: 'Residence type is required' });
const HomeLoanCountryEnum = z.enum(HOME_LOAN_COUNTRIES, { error: 'Country is required' });
const HomeLoanBusinessTypeEnum = z.enum(BUSINESS_OWNERSHIP_TYPES , { error: 'Business type is required' });
const HomeLoanOrgTypeEnum = z.enum(BUSINESS_ORGANIZATION_TYPES, { error: 'Organization type is required' });
const HomeLoanStdCodeEnum = z.enum(HOME_LOAN_STD_CODES, { error: 'STD code is required' });
const HomeLoanAltStdCodeEnum = z.enum(HOME_LOAN_STD_CODES, { error: 'STD code is required' });
const HomeLoanProfessionEnum =z.enum(HOME_LOAN_PROFESSIONS, { error: 'Profession is required' });
// const HomeLoanProfessionTypeBusinessEnum = z.enum(['Retail', 'Manufacturing', 'Freelancer', 'Other'], { error: 'Profession type is required' });
// const HomeLoanProfessionTypeServiceEnum = z.enum(['Private Job', 'Government Job', 'Other'], { error: 'Service type is required' });

const homeLoanSchema = z.object({
  title: HomeLoanTitleEnum,
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
  phone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Phone number is required'
        : issue.code === 'invalid_type'
        ? 'Phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),
  stdCode: HomeLoanStdCodeEnum,
  altStdCode: HomeLoanAltStdCodeEnum,
  altPhone: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Alternate phone must be string' : undefined }).optional(),
  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),
  gender: HomeLoanGenderEnum,
  maritalStatus: HomeLoanMaritalStatusEnum,
  spouseName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Spouse name must be string' : undefined }).optional(),
  childrenCount: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Children count must be number' : undefined }).optional(),
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
  residence: HomeLoanResidenceEnum,
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
  }).min(3, { error: 'Landmark must be at least 3 characters' }),
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
  country: HomeLoanCountryEnum,
  sameAsPresentAddress: z.boolean({ error: 'This field is required' }),
  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
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
  location: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Location is required'
        : issue.code === 'invalid_type'
        ? 'Location must be string'
        : undefined
  }).min(2, { error: 'Location must be at least 2 characters' }),
  propertyValue: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Property value is required'
        : issue.code === 'invalid_type'
        ? 'Property value must be a number'
        : undefined
  }).min(10000, { error: 'Property value must be at least ₹10,000' }),
  loanAmount: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Loan amount is required'
        : issue.code === 'invalid_type'
        ? 'Loan amount must be a number'
        : undefined
  }).min(1000, { error: 'Minimum loan amount is ₹1000' }),
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
  purpose: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Purpose is required'
        : issue.code === 'invalid_type'
        ? 'Purpose must be string'
        : undefined
 }).min(5, { error: 'Purpose must be at least 5 characters' })
  .max(200, { error: 'Purpose must be less than 200 characters' }),
  profession: HomeLoanProfessionEnum,
  professionType: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Profession type must be string' : undefined }).optional(),
  organizationType: HomeLoanOrgTypeEnum.optional(),
  businessType: HomeLoanBusinessTypeEnum.optional(),
  industry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Industry must be string' : undefined }).optional(),
  businessName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business name must be string' : undefined }).optional(),
  businessYears: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business years must be number' : undefined }).optional(),
  businessannualturnover: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business annual turnover must be number' : undefined }).optional(),
  businessAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business address must be string' : undefined }).optional(),
  businessCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business city must be string' : undefined }).optional(),
  businessPincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business pincode must be string' : undefined }).optional(),
  businessState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business state must be string' : undefined }).optional(),
  businessCountry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business country must be string' : undefined }).optional(),
  companyName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company name must be string' : undefined }).optional(),
  jobYears: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Job years must be number' : undefined }).optional(),
  monthlyIncome: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Monthly income must be a number' : undefined }).optional(),
  officeAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office address must be string' : undefined }).optional(),
 officeCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office city must be string' : undefined }).optional(),
  officePincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office pincode must be string' : undefined }).optional(),
  officeState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office state must be string' : undefined }).optional(),
  officeCountry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office country must be string' : undefined }).optional(),

  photo: z.string({ error: issue => issue.input === undefined ? 'Photo is required'  : issue.code === 'invalid_type' ? 'Photo must be string' : undefined }).min(1, { error: 'Photo is required' }),
  aadhaarFile: z.string({ error: issue => issue.input === undefined ? 'Aadhaar Card is required' : issue.code === 'invalid_type' ? 'Aadhaar file must be string' : undefined }).min(1, { error: 'Aadhaar Card is required' }),
  panFile: z.string({ error: issue => issue.input === undefined ? 'PAN Card is required' : issue.code === 'invalid_type' ? 'PAN file must be string' : undefined }).min(1, { error: 'PAN Card is required' }),
  bankProof: z.string({ error: issue => issue.input === undefined ? 'Bank Statement is required' : issue.code === 'invalid_type' ? 'Bank proof must be string' : undefined }).min(1, { error: 'Bank Statement is required' }),
  incomeproof: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Income proof must be string' : undefined }).optional(),
  companypan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company PAN must be string' : undefined }).optional(),
  companytan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company TAN must be string' : undefined }).optional(),
  cin: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'CIN must be string' : undefined }).optional(),
  gst: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'GST must be string' : undefined }).optional(),
  msme: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'MSME/UDYAM must be string' : undefined }).optional(),
  electricityBill: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Electricity bill must be string' : undefined }).optional(),
  rentagreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Rent agreement must be string' : undefined }).optional(),
  tradeLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Trade license must be string' : undefined }).optional(),
  foodLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Food license must be string' : undefined }).optional(),
  drugLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Drug license must be string' : undefined }).optional(),
  deedagreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Deed agreement must be string' : undefined }).optional(),
  bankStatementsCurrent: z.string({ error: issue => issue.input === undefined ? '1 Year Bank Statements (CA) is required' : issue.code === 'invalid_type' ? 'Bank Statements (CA) must be string' : undefined }).min(1, { error: '1 Year Bank Statements (CA) is required' }).optional(),
  itr1: z.string({ error: issue => issue.input === undefined ? 'ITR - Year 1 is required' : issue.code === 'invalid_type' ? 'ITR - Year 1 must be string' : undefined }).min(1, { error: 'ITR - Year 1 is required' }).optional(),
  itr2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 2 must be string' : undefined }).optional(),
  itr3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 3 must be string' : undefined }).optional(),
  computation1: z.string({ error: issue => issue.input === undefined ? 'Computation - Year 1 is required' : issue.code === 'invalid_type' ? 'Computation - Year 1 must be string' : undefined }).min(1, { error: 'Computation - Year 1 is required' }).optional(),
  computation2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation 2 must be string' : undefined }).optional(),
  computation3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation 3 must be string' : undefined }).optional(),
})
// Permanent address logic
.refine(
  data => data.sameAsPresentAddress === true || (data.permanentAddress?.trim() !== ''),
  { message: 'Permanent address is required when not same as present address', path: ['permanentAddress'] }
)
//Marital status logic
.refine(
  data => data.maritalStatus !== 'Married' || (data.spouseName?.trim() !== ''),
  { message: 'Spouse name is required for married applicants', path: ['spouseName'] }
)
.refine(
  data => data.maritalStatus !== 'Married' || (/^\d+$/.test(data.childrenCount?.trim() || '')),
  { message: 'Children count is required for married applicants', path: ['childrenCount'] }
)
// Business fields required if profession is Business
.refine(
  data => data.profession !== 'Business' || (data.professionType?.trim() !== ''),
  { message: 'Profession type is required for business applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Business' || (BUSINESS_PROFESSION_TYPES.includes(data?.professionType)),
  { message: 'Invalid profession type for business applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Business' || (data.organizationType !== undefined),
  { message: 'Organization type is required for business applicants', path: ['organizationType'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessType !== undefined),
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
  data => data.profession !== 'Business' || (data.businessYears !== undefined && data.businessYears >= 1),
  { message: 'Years in Business must be at least 1 year', path: ['businessYears'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessannualturnover !== undefined && data.businessannualturnover >= 1000),
  { message: 'Annual Turnover must be at least 1000', path: ['businessannualturnover'] }
)
// Business address validation
.refine(
  data => data.profession !== 'Business' || (data.businessAddress?.trim() !== ''),
  { message: 'Business address is required for business applicants', path: ['businessAddress'] }
)

.refine(
  data => data.profession !== 'Business' || (data.businessCity && data.businessCity.trim() !== ''),
  { message: 'Business city is required for business applicants', path: ['businessCity'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessPincode && data.businessPincode.trim() !== ''),
  { message: 'Business pincode is required for business applicants', path: ['businessPincode'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessState && data.businessState.trim() !== ''),
  { message: 'Business state is required for business applicants', path: ['businessState'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessCountry !== undefined && data.businessCountry !== ''),
  { message: 'Business country is required for business applicants', path: ['businessCountry'] }
)
.refine(
  data => data.profession !== 'Business' || (HOME_LOAN_COUNTRIES.includes(data?.businessCountry)),
  { message: 'Invalid business country', path: ['businessCountry'] }
)
// Service fields required if profession is Service
.refine(
  data => data.profession !== 'Service' || (data.professionType?.trim() !== ''),
  { message: 'Profession type is required for service applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Service' || (SERVICE_PROFESSION_TYPES.includes(data?.professionType)),
  { message: 'Invalid profession type for service applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Service' || (data.companyName && data.companyName.trim() !== ''),
  { message: 'Company name is required for service applicants', path: ['companyName'] }
)
.refine(
  data => data.profession !== 'Service' || (data.jobYears !== undefined && data.jobYears >= 1),
  { message: 'Job years is required for service applicants', path: ['jobYears'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeAddress && data.officeAddress.trim() !== ''),
  { message: 'Office address is required for service applicants', path: ['officeAddress'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeCity  && data.officeCity.trim() !== ''),
  { message: 'Office city is required for service applicants', path: ['officeCity'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officePincode && data.officePincode.trim() !== ''),
  { message: 'Office pincode is required for service applicants', path: ['officePincode'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeState && data.officeState.trim() !== ''),
  { message: 'Office state is required for service applicants', path: ['officeState'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeCountry !== undefined && data.officeCountry !== ''),
  { message: 'Office country is required for service applicants', path: ['officeCountry'] }
)
.refine (
  data => data.profession !== 'Service' || (HOME_LOAN_COUNTRIES.includes(data?.officeCountry)),
  { message: 'Invalid office country', path: ['officeCountry'] }
)
.refine(
  data => data.profession !== 'Service' || (data.monthlyIncome !== undefined &&  data.monthlyIncome >= 1000),
  { message: 'Monthly Income must be at least ₹1000', path: ['monthlyIncome'] }
)
// Partnership deed required if organizationType is partnership
.refine(
  data => data.organizationType !== 'partnership' || (data.deedagreement && data.deedagreement.trim() !== ''),
  { message: 'Partnership deed agreement is required for partnership organizations', path: ['deedagreement'] }
)
// Rent agreement required if businessType is rented
.refine(
  data => data.businessType !== 'Rented' || (data.rentagreement && data.rentagreement.trim() !== ''),
  { message: 'Rent agreement is required for rented business type', path: ['rentagreement'] }
)
.refine (
  data => data.profession !== 'Business' || (data.bankStatementsCurrent !== undefined),
  { message: 'Bank Statement is required for business applicants', path: ['bankstatement'] }
)
.refine (
  data => data.profession !== 'Business' || (data.itr1 !== undefined),
  { message: 'ITR 1 is required for business applicants', path: ['itr1'] }
)
.refine (
  data => data.profession !== 'Business' || (data.computation1 !== undefined),
  { message: 'Computation 1 is required for business applicants', path: ['computation1'] }
)

module.exports = homeLoanSchema;