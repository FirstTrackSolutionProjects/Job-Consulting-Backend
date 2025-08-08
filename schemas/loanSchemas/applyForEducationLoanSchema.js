const { z } = require('zod');
const {
  TITLES,
  GENDERS,
  MARITAL_STATUS,
  RESIDENCE_OWNERSHIP_TYPES,
  EDUCATION_LOAN_COUNTRIES,
  EDUCATION_LOAN_STD_CODES,
  EDUCATION_LOAN_HIGHEST_QUALIFICATIONS,
  EDUCATION_LOAN_TWELFTH_STREAMS,
  EDUCATION_LOAN_GRADUATION_STREAMS,
  EDUCATION_LOAN_POST_GRADUATION_STREAMS,EDUCATION_LOAN_GUARDIAN_STD_CODES,EDUCATION_LOAN_GUARDIAN_RELATION,
  EDUCATION_LOAN_GUARDIAN_OCCUPATIONS,
  BUSINESS_ORGANIZATION_TYPES,
  BUSINESS_OWNERSHIP_TYPES,
  // SERVICE_PROFESSION_TYPES,
} = require('../../constants');

// Enums (unique to Education Loan)
const EducationLoanTitleEnum = z.enum(TITLES, { error: 'Title is required' });
const EducationLoanGenderEnum = z.enum(GENDERS, { error: 'Gender is required' });
const EducationLoanMaritalStatusEnum = z.enum(MARITAL_STATUS, { error: 'Marital status is required' });
const EducationLoanResidenceEnum = z.enum(RESIDENCE_OWNERSHIP_TYPES, { error: 'Residence type is required' });
const EducationLoanCountryEnum = z.enum(EDUCATION_LOAN_COUNTRIES, { error: 'Country is required' });
const EducationLoanStdCodeEnum = z.enum(EDUCATION_LOAN_STD_CODES, { error: 'STD code is required' });
const EducationLoanAltStdCodeEnum = z.enum(EDUCATION_LOAN_STD_CODES, { error: 'STD code is required' });
const EducationLoanGuardianStdCodeEnum = z.enum(EDUCATION_LOAN_GUARDIAN_STD_CODES, { error: 'STD code is required' });
const EducationLoanOrgTypeEnum = z.enum(BUSINESS_ORGANIZATION_TYPES, { error: 'Organization type is required' });
const EducationLoanBusinessTypeEnum = z.enum(BUSINESS_OWNERSHIP_TYPES, { error: 'Business type is required' });
// const EducationLoanServiceTypeEnum = z.enum(SERVICE_PROFESSION_TYPES, { error: 'Service type is required' });
const EducationLoanGuardianRelationEnum = z.enum(EDUCATION_LOAN_GUARDIAN_RELATION, { error: 'Guardian relation is required' });
const EducationLoanGuardianOccupationEnum = z.enum( EDUCATION_LOAN_GUARDIAN_OCCUPATIONS, { error: 'Guardian occupation is required' });
// const EducationLoanOccupationDescriptionEnum = z.enum(['Homemaker', 'Farmer', 'Self-employed', 'Freelancer', 'Retired', 'Other'], { error: 'Occupation description is required' });
const EducationLoanHighestQualificationEnum = z.enum(EDUCATION_LOAN_HIGHEST_QUALIFICATIONS, { error: 'Highest qualification is required' });
const EducationLoanTwelfthStreamEnum = z.enum(EDUCATION_LOAN_TWELFTH_STREAMS, { error: '12th stream is required' });
const EducationLoanGraduationStreamEnum = z.enum(EDUCATION_LOAN_GRADUATION_STREAMS, { error: 'Graduation stream is required' });
const EducationLoanPostGradStreamEnum = z.enum(EDUCATION_LOAN_POST_GRADUATION_STREAMS, { error: 'Post graduation stream is required' });



const educationLoanSchema = z.object({
  title: EducationLoanTitleEnum,
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
  stdCode: EducationLoanStdCodeEnum,
  altStdCode: EducationLoanAltStdCodeEnum,
  altPhone: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Alternate phone must be string'
        : undefined
  }).optional(),
  dob: z.string({
    error: issue =>
      issue.input === undefined
        ? 'DOB is required'
        : issue.code === 'invalid_type'
        ? 'DOB must be string'
        : undefined
  }).regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'DOB must be in yyyy-mm-dd format' }),
  gender: EducationLoanGenderEnum,
  maritalStatus: EducationLoanMaritalStatusEnum,
  spouseName: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
        ? 'Spouse name must be string'
        : undefined
  }).optional(),
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
  residence: EducationLoanResidenceEnum,
   presentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Present address is required'
        : issue.code === 'invalid_type'
        ? 'Present address must be string'
        : undefined
  }).min(5, { error: 'Present address must be at least 5 characters' })
  .max(200, { error: 'Present address must be less than 200 characters' }),
   landmark: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Landmark is required'
        : issue.code === 'invalid_type'
        ? 'Landmark must be string'
        : undefined
  }).min(3, { error: 'Landmark must be at least 3 characters' }),
  country: EducationLoanCountryEnum,
  state: z.string({
    error: issue =>
      issue.input === undefined
        ? "State is required"
        : issue.code === 'invalid_type'
        ? "State must be string"
        : undefined
  }).min(3, { error: "State must be at least 3 characters" }),
  city: z.string({
    error: issue =>
      issue.input === undefined
        ? "City is required"
        : issue.code === 'invalid_type'
        ? "City must be string"
        : undefined
  }).min(2, { error: "City must be at least 2 characters" }),
  pincode: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Pincode is required'
        : issue.code === 'invalid_type'
        ? 'Pincode must be string'
        : undefined
  }).regex(/^[1-9][0-9]{5}$/, { error: 'Enter a valid 6‑digit Indian pincode' }),
  sameAsPresentAddress: z.boolean({ error: 'This field is required' }),
  permanentAddress: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Permanent address is required'
        : issue.code === 'invalid_type'
        ? 'Permanent address must be string'
        : undefined
  }).min(5, { error: 'Permanent address must be at least 5 characters' }).optional(),
 
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
  studentName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Student name is required'
        : issue.code === 'invalid_type'
        ? 'Student name must be string'
        : undefined
  }).min(3, { error: 'Student name must be at least 3 characters' }),
  courseName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Course name is required'
        : issue.code === 'invalid_type'
        ? 'Course name must be string'
        : undefined
  }).min(2, { error: 'Course name must be at least 2 characters' }),
  institutionName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Institution name is required'
        : issue.code === 'invalid_type'
        ? 'Institution name must be string'
        : undefined
  }).min(2, { error: 'Institution name must be at least 2 characters' }),
  duration: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Duration is required'
        : issue.code === 'invalid_type'
        ? 'Duration must be a number'
        : undefined
  }).min(1, { error: 'Duration must be at least 1 year' }),
  loanAmount: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Loan amount is required'
        : issue.code === 'invalid_type'
        ? 'Loan amount must be a number'
        : undefined
  }).min(1000, { error: 'Minimum loan amount is ₹1000' }),
  highestQualification: EducationLoanHighestQualificationEnum,
  twelfthStream: EducationLoanTwelfthStreamEnum,
  twelfthCollege: z.string({
    error: issue =>
      issue.input === undefined
        ? '12th college is required'
        : issue.code === 'invalid_type'
        ? '12th college must be string'
        : undefined
  }).min(2, { error: '12th college must be at least 2 characters' }),
  twelfthUniversity: z.string({
    error: issue =>
      issue.input === undefined
        ? '12th university is required'
        : issue.code === 'invalid_type'
        ? '12th university must be string'
        : undefined
  }).min(2, { error: '12th university must be at least 2 characters' }),
  twelfthPercent: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? '12th percentage is required'
        : issue.code === 'invalid_type'
        ? '12th percentage must be a number'
        : undefined
  }).min(0, { error: '12th percentage cannot be negative' })
    .max(100, { error: '12th percentage cannot exceed 100' }),
  twelfthCertificate: z.string({
    error: issue =>
      issue.input === undefined
        ? '12th certificate is required'
        : issue.code === 'invalid_type'
        ? '12th certificate must be string'
        : undefined
  }).min(1, { error: '12th certificate is required' }),
  twelfthMarksheet: z.string({
    error: issue =>
      issue.input === undefined
        ? '12th marksheet is required'
        : issue.code === 'invalid_type'
        ? '12th marksheet must be string'
        : undefined
  }).min(1, { error: '12th marksheet is required' }),
  twelfthclcCertificate: z.string({
    error: issue =>
      issue.input === undefined
        ? '12th CLC certificate is required'
        : issue.code === 'invalid_type'
        ? '12th CLC certificate must be string'
        : undefined
  }).min(1, { error: '12th CLC certificate is required' }),
  graduationStream: EducationLoanGraduationStreamEnum.optional(),
  graduationCollege: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Graduation college is required'
        : issue.code === 'invalid_type'
        ? 'Graduation college must be string'
        : undefined
  }).min(2, { error: 'Graduation college must be at least 2 characters' }).optional(),
  graduationUniversity: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Graduation university is required'
        : issue.code === 'invalid_type'
        ? 'Graduation university must be string'
        : undefined
  }).min(2, { error: 'Graduation university must be at least 2 characters' }).optional(),
  graduationCgpa: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Graduation CGPA is required'
        : issue.code === 'invalid_type'
        ? 'Graduation CGPA must be a number'
        : undefined
  }).min(0, { error: 'Graduation CGPA cannot be negative' })
    .max(10, { error: 'Graduation CGPA cannot exceed 10' }).optional(),
  graduationCertificate: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Graduation certificate is required'
        : issue.code === 'invalid_type'
        ? 'Graduation certificate must be string'
        : undefined
  }).min(1, { error: 'Graduation certificate is required' }).optional(),
  graduationclcCertificate: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Graduation CLC certificate is required'
        : issue.code === 'invalid_type'
        ? 'Graduation CLC certificate must be string'
        : undefined
  }).min(1, { error: 'Graduation CLC certificate is required' }).optional(),
  postGradStream: EducationLoanPostGradStreamEnum.optional(),
  postGradCollege: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Post graduation college is required'
        : issue.code === 'invalid_type'
        ? 'Post graduation college must be string'
        : undefined
  }).min(2, { error: 'Post graduation college must be at least 2 characters' }).optional(),
  postGradUniversity: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Post graduation university is required'
        : issue.code === 'invalid_type'
        ? 'Post graduation university must be string'
        : undefined
  }).min(2, { error: 'Post graduation university must be at least 2 characters' }).optional(),
  postGradCgpa: z.coerce.number({
    error: issue =>
      issue.input === undefined
        ? 'Post graduation CGPA is required'
        : issue.code === 'invalid_type'
        ? 'Post graduation CGPA must be a number'
        : undefined
  }).min(0, { error: 'Post graduation CGPA cannot be negative' })
    .max(10, { error: 'Post graduation CGPA cannot exceed 10' }).optional(),
  postGradCertificate: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Post graduation certificate is required'
        : issue.code === 'invalid_type'
        ? 'Post graduation certificate must be string'
        : undefined
  }).min(1, { error: 'Post graduation certificate is required' }).optional(),
  postGradclcCertificate: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Post graduation CLC certificate is required'
        : issue.code === 'invalid_type'
        ? 'Post graduation CLC certificate must be string'
        : undefined
  }).min(1, { error: 'Post graduation CLC certificate is required' }).optional(),

//student bank details
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
  guardianName: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Guardian name is required'
        : issue.code === 'invalid_type'
        ? 'Guardian name must be string'
        : undefined
  }).min(3, { error: 'Guardian name must be at least 3 characters' }),
  guardianPhone: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Guardian phone is required'
        : issue.code === 'invalid_type'
        ? 'Guardian phone must be string'
        : undefined
  }).regex(/^[6-9]\d{9}$/, { error: 'Enter valid 10‑digit Indian mobile number' }),
  guardianStdCode: EducationLoanGuardianStdCodeEnum,
  guardianRelation: EducationLoanGuardianRelationEnum,

  guardianOccupation: EducationLoanGuardianOccupationEnum,
  // serviceType: EducationLoanServiceTypeEnum.optional(),
  organizationType:EducationLoanOrgTypeEnum.optional(),
  businessType: EducationLoanBusinessTypeEnum.optional(),
  industry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Industry must be string' : undefined }).optional(),
  businessYears: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business years must be a number' : undefined }).optional(),
  businessName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business name must be string' : undefined }).optional(),
  businessannualturnover: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business annual turnover must be number' : undefined }).optional(),
  businessAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business address must be string' : undefined }).optional(),
  businessState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business state must be string' : undefined }).optional(),
  businessCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business city must be string' : undefined }).optional(),
  businessPincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business pincode must be string' : undefined }).optional(),
  businessCountry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business country must be string' : undefined }).optional(),
  companyName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company name must be string' : undefined }).optional(),
  designation: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Designation must be string' : undefined }).optional(),
  experience: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Experience must be a number' : undefined }).optional(),
  monthlyIncome: z.coerce.number({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Monthly income must be number' : undefined }).optional(),
  officeAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office address must be string' : undefined }).optional(),
  officeState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office state must be string' : undefined }).optional(),
  officeCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office city must be string' : undefined }).optional(),
  officePincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office pincode must be string' : undefined }).optional(),
  officeCountry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office country must be string' : undefined }).optional(),
  
  // appointmentLetter: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Appointment letter must be string' : undefined }).optional(),

  // occupationDescription: EducationLoanOccupationDescriptionEnum,
 
  
  // All file fields (store S3 key as string)
  photo: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Photo must be string' : undefined }).min(1, { error: 'Photo is required' }),
  aadhaarFile: z.string({ error: issue => issue.input === undefined ? 'Aadhaar Card is required' : issue.code === 'invalid_type' ? 'Aadhaar file must be string' : undefined }).min(1, { error: 'Aadhaar Card is required' }),
  panFile: z.string({ error: issue => issue.input === undefined ? 'PAN Card is required' : issue.code === 'invalid_type' ? 'PAN file must be string' : undefined }).min(1, { error: 'PAN Card is required' }),
  bankProof: z.string({ error: issue => issue.input === undefined ? 'Bank Statement is required' : issue.code === 'invalid_type' ? 'Bank proof must be string' : undefined }).min(1, { error: 'Bank Statement is required' }),
  incomeProof: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Salary slip must be string' : undefined }).optional(),
  gst: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'GST Certificate  must be string' : undefined }).optional(),
  msme: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'MSME/Udyam Certificate must be string' : undefined }).optional(),
  electricityBill: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Electricity bill must be string' : undefined }).optional(),
  rentagreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Rent Agreement  must be string' : undefined }).optional(),
  companyPan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company PAN must be string' : undefined }).optional(),
  companyTan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company TAN must be string' : undefined }).optional(),
  cin: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'CIN must be string' : undefined }).optional(),
  tradeLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Trade license must be string' : undefined }).optional(),
  foodLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Food license must be string' : undefined }).optional(),
  drugLicense: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Drug license must be string' : undefined }).optional(),
  bankStatementsCurrent: z.string({ error: issue => issue.input === undefined ? '1 Year Bank Statements (CA) is required' : issue.code === 'invalid_type' ? 'Bank Statements (CA) must be string' : undefined }).min(1, { error: '1 Year Bank Statements (CA) is required' }).optional(),
  
  deedagreement: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Partnership Deed must be string' : undefined }).optional(),
  itr1: z.string({ error: issue => issue.input === undefined ? 'ITR - Year 1 is required' : issue.code === 'invalid_type' ? 'ITR - Year 1 must be string' : undefined }).min(1, { error: 'ITR - Year 1 is required' }).optional(),
  itr2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR - Year 2 must be string' : undefined }).optional(),
  itr3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR - Year 3 must be string' : undefined }).optional(),
  computation1: z.string({ error: issue => issue.input === undefined ? 'Computation - Year 1 is required' : issue.code === 'invalid_type' ? 'Computation - Year 1 must be string' : undefined }).min(1, { error: 'Computation - Year 1 is required' }).optional(),
  computation2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation - Year 2 must be string' : undefined }).optional(),
  computation3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation - Year 3 must be string' : undefined }).optional(),
  // Guardian file fields
  guardianphoto: z.string({ error: issue => issue.input === undefined ?'Guardianphoto is required' : issue.code === 'invalid_type' ? 'Guardian photo  must be string' : undefined }).optional(),
  guardianaadhaar: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Guardian Aadhaar  must be string' : undefined }).optional(),
  guardianpan: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Guardian PAN  must be string' : undefined }).optional(),
  // loanAmount: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Loan amount  must be string' : undefined }).optional(),
})
// Permanent address logic
.refine(
  data => data.sameAsPresentAddress === true || (data.permanentAddress !== undefined),
  { message: 'Permanent address is required when not same as present address', path: ['permanentAddress'] }
)
// Marital status-based validations
.refine(
  data => data.maritalStatus !== 'Married' || (data.spouseName?.trim() !== ''),
  { message: 'Spouse name is required for married applicants', path: ['spouseName'] }
)
.refine(
  data => data.maritalStatus !== 'Married' || (data.childrenCount !== undefined && data.childrenCount >= 0),
  { message: 'Children count is required for married applicants', path: ['childrenCount'] }
)

// Guardian occupation-based validations
.refine(
  data => !data.guardianRelation || data.guardianOccupation,
  { message: 'Guardian occupation is required when guardian relation is provided', path: ['guardianOccupation'] }
)


// Business-specific validations
.refine(
  data => data.guardianOccupation !== 'Business' || (data.organizationType !== undefined),
  { message: 'Organization type is required for business applicants', path: ['organizationType'] }
)

.refine(
  data => data.guardianOccupation !== 'Business' || (data.businessType !== undefined && data.businessType !== ''),
  { message: 'Business type is required for business applicants', path: ['businessType'] }
)

.refine(
  data => data.guardianOccupation !== 'Business' || (data.industry?.trim() !== ''),
  { message: 'Industry is required for business applicants', path: ['industry'] }
)
.refine(
  data => data.guardianOccupation !== 'Business' || (data.businessName?.trim() !== ''),
  { message: 'Business name is required for business applicants', path: ['businessName'] }
)
.refine(
  data => data.guardianOccupation !== 'Business' ||(data.businessYears !== undefined && data.businessYears >= 1),
  { message: 'Years in Business must be at least 1 year', path: ['businessYears'] }
)
.refine(
  data => data.guardianOccupation !== 'Business' || (data.businessannualturnover !== undefined && data.businessannualturnover >= 1000),
  { message: 'Annual Turnover must be at least 1000', path: ['businessannualturnover'] }
)
// Service-specific validations
// .refine(
//   data => data.guardianOccupation !== 'Service' || data.serviceType,
//   { message: 'Service type is required for service occupation', path: ['serviceType'] }
// )
.refine(
  data => data.guardianOccupation !== 'Service' || data.companyName?.trim(),
  { message: 'Company name is required for service occupation', path: ['companyName'] }
)
.refine(
  data => data.guardianOccupation !== 'Service' || data.designation?.trim(),
  { message: 'Designation is required for service occupation', path: ['designation'] }
)
.refine(
  data => data.guardianOccupation !== 'Service' || (data.experience !== undefined && data.experience >= 0),
  { message: 'Years in job is required for service occupation', path: ['experience'] }
)
.refine(
  data => data.guardianOccupation !== 'Service' || (data.monthlyIncome !== undefined && data.monthlyIncome >= 0),
  { message: 'Monthly income is required for service occupation', path: ['monthlyIncome'] }
)
// Other occupation validations
// .refine(
//   data => data.guardianOccupation !== 'Other' || data.occupationDescription,
//   { message: 'Occupation description is required for other occupation', path: ['occupationDescription'] }
// )
// Highest qualification-based file validations
.refine(
  data => data.highestQualification !== '12th' || data.twelfthCertificate,
  { message: '12th certificate is required for 12th qualification', path: ['twelfthCertificate'] }
)
.refine(
  data => data.highestQualification !== '12th' || data.twelfthMarksheet,
  { message: '12th marksheet is required for 12th qualification', path: ['twelfthMarksheet'] }
)
.refine(
  data => data.highestQualification !== '12th' || data.twelfthclcCertificate,
  { message: '12th CLC certificate is required for 12th qualification', path: ['twelfthclcCertificate'] }
)
.refine (
  data => data.highestQualification !== 'Graduation' || data.graduationStream,
  { message: 'Graduation stream is required for Graduation Qualification', path: ['graduationStream']}
)
.refine (
  data => data.highestQualification !== 'Graduation' || data.graduationCollege,
  { message: 'Graduation college is required for Graduation Qualification', path: ['graduationCollege']}
)
.refine (
  data => data.highestQualification !== 'Graduation' || data.graduationUniversity,
  { message: 'Graduation university is required for Graduation Qualification', path: ['graduationUniversity']}
)
.refine (
  data => data.highestQualification !== 'Graduation' || data.graduationCgpa,
  { message: 'Graduation CGPA  is required for Graduation Qualification', path: ['graduationCgpa']}
)
.refine(
  data => data.highestQualification !== 'Graduation' || data.graduationCertificate,
  { message: 'Graduation certificate is required for graduation qualification', path: ['graduationCertificate'] }
)
.refine(
  data => data.highestQualification !== 'Graduation' || data.graduationclcCertificate,
  { message: 'Graduation CLC certificate is required for graduation qualification', path: ['graduationclcCertificate'] }
)
.refine (
  data => data.highestQualification !== 'Post Graduation' || data.postGradStream,
  { message: 'post graduation stream is required for post graduation Qualification', path: ['postGradStream']}
)
.refine (
  data => data.highestQualification !== 'Post Graduation' || data.postGradCollege,
  { message: 'Post graduation college is required for post graduation Qualification', path: ['postGradCollege']}
)
.refine (
  data => data.highestQualification !== 'Post Graduation' || data.postGradUniversity,
  { message: 'Post graduation university is required for post graduation Qualification', path: ['postGradUniversity']}
)
.refine (
  data => data.highestQualification !== 'Post Graduation' || data.graduationCgpa,
  { message: 'post graduation CGPA  is required for post graduation Qualification', path: ['postGradCgpa']}
)

.refine(
  data => data.highestQualification !== 'Post Graduation' || data.postGradCertificate,
  { message: 'Post graduation certificate is required for post graduation qualification', path: ['postGradCertificate'] }
)
.refine(
  data => data.highestQualification !== 'Post Graduation' || data.postGradclcCertificate,
  { message: 'Post graduation CLC certificate is required for post graduation qualification', path: ['postGradclcCertificate'] }
)
// File validations
.refine (
  data => data.guardianOccupation !== 'Business' || (data.bankStatementsCurrent !== undefined),
  { message: 'Bank Statement is required for business applicants', path: ['bankstatement'] }
)
.refine (
  data => data.guardianOccupation !== 'Business' || (data.itr1 !== undefined),
  { message: 'ITR 1 is required for business applicants', path: ['itr1'] }
)
.refine (
  data => data.guardianOccupation !== 'Business' || (data.computation1 !== undefined),
  { message: 'Computation 1 is required for business applicants', path: ['computation1'] }
)


module.exports =  educationLoanSchema;