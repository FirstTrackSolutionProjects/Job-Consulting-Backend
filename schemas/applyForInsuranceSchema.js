const { z } = require("zod")
 
const {GENDERS, RESIDENCE_OWNERSHIP_TYPES, INSURANCE_COUNTRIES,
INSURANCE_PROFESSIONS, BUSINESS_PROFESSION_TYPES, SERVICE_PROFESSION_TYPES, BUSINESS_ORGANIZATION_TYPES, BUSINESS_OWNERSHIP_TYPES, INSURANCE_TYPES } = require('../constants');



// eEnums for Insurance loan
const InsuranceGenderEnum = z.enum(GENDERS, { error: 'Gender is required' });
const InsuranceResidenceEnum = z.enum(RESIDENCE_OWNERSHIP_TYPES, { error: 'Residence type is required' });
const InsuranceCountryEnum =  z.enum(INSURANCE_COUNTRIES, { error: 'Country is required' });
const InsuranceTypeEnum = z.enum(INSURANCE_TYPES,{ error: 'Insurance type is required' });
const InsuranceProfessionEnum = z.enum(INSURANCE_PROFESSIONS, { error: 'Profession is required' });
const InsuranceOrgTypeEnum = z.enum(BUSINESS_ORGANIZATION_TYPES, { error: 'Organization type is required' });
const InsuranceBusinessTypeEnum = z.enum(BUSINESS_OWNERSHIP_TYPES, { error: 'Business type is required '});


const InsuranceSchema = z.object({
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
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
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

  gender: InsuranceGenderEnum,
  residence: InsuranceResidenceEnum,
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
    ? undefined : issue.code === 'invalid_type' 
    ? 'Landmark must be string' 
    : undefined }).optional(),
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
  country: InsuranceCountryEnum,
  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
        : undefined
  }).min(5, { error: 'Permanent address must be at least 5 characters' }).optional(),

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

    profession: InsuranceProfessionEnum,
    professionType: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Profession type must be string' : undefined }).optional(),
    organizationType: InsuranceOrgTypeEnum.optional(),
    businessType:InsuranceBusinessTypeEnum.optional(),
    industry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Industry must be string' : undefined }).optional(),
    businessName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business name must be string' : undefined }).optional(),
    businessYears: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business years must be number' : undefined }).optional(),
    businessannualturnover: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business annual turnover must be number' : undefined }).optional(),
    businessAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business address must be string' : undefined }).optional(),
    businessCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business city must be string' : undefined }).optional(),
    businessPincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business pincode must be string' : undefined }).optional(),
    businessState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business state must be string' : undefined }).optional(),
    businessCountry: InsuranceCountryEnum.optional(),

    companyName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company name must be string' : undefined }).optional(),
      jobYears: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Job years must be number' : undefined }).optional(),
      monthlyIncome: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Monthly income must be number' : undefined }).optional(),
      officeAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office address must be string' : undefined }).optional(),
      officeCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office city must be string' : undefined }).optional(),
      officePincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office pincode must be string' : undefined }).optional(),
      officeState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office state must be string' : undefined }).optional(),
      officeCountry: InsuranceCountryEnum.optional(),

      // Bank Details
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
  
      //File Fields
  photo: z.string({ error: issue => issue.input === undefined ? 'Photo is required' : issue.code === 'invalid_type' ? 'Photo must be string' : undefined }).optional(),
  aadhaarFile: z.string({ error: issue => issue.input === undefined ? 'Aadhaar Card is required' : issue.code === 'invalid_type' ? 'Aadhaar file must be string' : undefined }).min(1, { error: 'Aadhaar Card is required' }),
  panFile: z.string({ error: issue => issue.input === undefined ? 'PAN Card is required' : issue.code === 'invalid_type' ? 'PAN file must be string' : undefined }).min(1, { error: 'PAN Card is required' }),
  bankProof: z.string({ error: issue => issue.input === undefined ? 'Bank Statement is required' : issue.code === 'invalid_type' ? 'Bank proof must be string' : undefined }).min(1, { error: 'Bank Statement is required' }),
  incomeproof: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Salary Slip must be string' : undefined }).optional(),
  itr1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR - Year 1 must be string' : undefined }).optional(),
  itr2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 2 must be string' : undefined }).optional(),
  computation1: z.string({ error: issue => issue.input === undefined ? 'Computation - Year 1 is required' : issue.code === 'invalid_type' ? 'Computation - Year 1 must be string' : undefined }).min(1, { error: 'Computation - Year 1 is required' }).optional(),
  computation2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation 2 must be string' : undefined }).optional(),
})
// Business section required fields
.refine(
  data => data.profession !== 'Business' || (data.professionType !== undefined),
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
  data => data.profession !== 'Business' || (data.industry !== undefined),
  { message: 'Industry is required for business applicants', path: ['industry'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessName !== undefined),
  { message: 'Business name is required for business applicants', path: ['businessName'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessYears !== undefined),
  { message: 'Business years is required for business applicants', path: ['businessYears'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessannualturnover !== undefined),
  { message: 'Business annual turnover is required for business applicants', path: ['businessannualturnover'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessAddress !== undefined),
  { message: 'Business address is required for business applicants', path: ['businessAddress'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessCity !== undefined),
  { message: 'Business city is required for business applicants', path: ['businessCity'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessPincode !== undefined),
  { message: 'Business pincode is required for business applicants', path: ['businessPincode'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessState !== undefined),
  { message: 'Business state is required for business applicants', path: ['businessState'] }
)
.refine(
  data => data.profession !== 'Business' || (data.businessCountry !== undefined ),
  { message: 'Business country is required for business applicants', path: ['businessCountry'] }
)
// Service section required fields
.refine(
  data => data.profession !== 'Service' || (data.professionType !== undefined),
  { message: 'Profession type is required for service applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Service' || (SERVICE_PROFESSION_TYPES.includes(data?.professionType)),
  { message: 'Invalid profession type for service applicants', path: ['professionType'] }
)
.refine(
  data => data.profession !== 'Service' || (data.companyName !== undefined),
  { message: 'Company name is required for service applicants', path: ['companyName'] }
)
.refine(
  data => data.profession !== 'Service' || (data.jobYears !== undefined),
  { message: 'Job years is required for service applicants', path: ['jobYears'] }
)
.refine(
  data => data.profession !== 'Service' || (data.monthlyIncome !== undefined),
  { message: 'Monthly income is required for service applicants', path: ['monthlyIncome'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeAddress !== undefined),
  { message: 'Office address is required for service applicants', path: ['officeAddress'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeCity !== undefined),
  { message: 'Office city is required for service applicants', path: ['officeCity'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officePincode !== undefined),
  { message: 'Office pincode is required for service applicants', path: ['officePincode'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeState !== undefined),
  { message: 'Office state is required for service applicants', path: ['officeState'] }
)
.refine(
  data => data.profession !== 'Service' || (data.officeCountry !== undefined),
  { message: 'Office country is required for service applicants', path: ['officeCountry'] }
)
.refine(
  data => (data.profession !== 'Service') || (INSURANCE_COUNTRIES.includes(data?.officeCountry)),
  { message: 'Invalid Office country!', path: ['officeCountry'] }
)
.refine (
  data => data.profession !== 'Business' || (data.itr1 !== undefined),
  { message: 'ITR 1 is required for business applicants', path: ['itr1'] }
)
.refine (
  data => data.profession !== 'Business' || (data.computation1 !== undefined),
  { message: 'Computation 1 is required for business applicants', path: ['computation1'] }
)

module.exports = InsuranceSchema;