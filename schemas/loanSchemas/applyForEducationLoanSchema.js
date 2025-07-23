const { z } = require('zod');

// Enums (unique to Education Loan)
const EducationLoanTitleEnum = z.enum(['Mr', 'Mrs', 'Miss', 'Dr'], { error: 'Title is required' });
const EducationLoanGenderEnum = z.enum(['Male', 'Female', 'Other'], { error: 'Gender is required' });
const EducationLoanMaritalStatusEnum = z.enum(['Unmarried', 'Married', 'Single'], { error: 'Marital status is required' });
const EducationLoanStdCodeEnum = z.enum(['+91', '+1', '+44'], { error: 'STD code is required' });
const EducationLoanCountryEnum = z.enum(['India'], { error: 'Country is required' });

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
  altStdCode: EducationLoanStdCodeEnum,
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
  childrenCount: z.string({
    error: issue =>
      issue.input === undefined
        ? undefined
        : issue.code === 'invalid_type'
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
  }).min(3, { error: "City must be at least 3 characters" }),
  pincode: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Pincode is required'
        : issue.code === 'invalid_type'
        ? 'Pincode must be string'
        : undefined
  }).regex(/^[1-9][0-9]{5}$/, { error: 'Enter a valid 6‑digit Indian pincode' }),
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
  guardianStdCode: EducationLoanStdCodeEnum,
  guardianRelation: z.string({
    error: issue =>
      issue.input === undefined
        ? 'Guardian relation is required'
        : issue.code === 'invalid_type'
        ? 'Guardian relation must be string'
        : undefined
  }).min(2, { error: 'Guardian relation must be at least 2 characters' }),
  organizationType: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Organization type must be string' : undefined }).optional(),
  businessType: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business type must be string' : undefined }).optional(),
  industry: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Industry must be string' : undefined }).optional(),
  businessYears: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business years must be string' : undefined }).optional(),
  businessName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business name must be string' : undefined }).optional(),
  businessAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business address must be string' : undefined }).optional(),
  businessState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business state must be string' : undefined }).optional(),
  businessCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business city must be string' : undefined }).optional(),
  businessPincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Business pincode must be string' : undefined }).optional(),
  businessCountry: EducationLoanCountryEnum.optional(),
  annualturnover: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Annual turnover must be string' : undefined }).optional(),
  serviceType: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Service type must be string' : undefined }).optional(),
  designation: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Designation must be string' : undefined }).optional(),
  experience: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Experience must be string' : undefined }).optional(),
  officeAddress: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office address must be string' : undefined }).optional(),
  officeState: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office state must be string' : undefined }).optional(),
  officeCity: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office city must be string' : undefined }).optional(),
  officePincode: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Office pincode must be string' : undefined }).optional(),
  officeCountry: EducationLoanCountryEnum.optional(),
  highestQualification: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Highest qualification must be string' : undefined }).optional(),
  tenthCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Tenth certificate must be string' : undefined }).optional(),
  tenthMarksheet: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Tenth marksheet must be string' : undefined }).optional(),
  tenthPercentage: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Tenth percentage must be string' : undefined }).optional(),
  twelfthCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Twelfth certificate must be string' : undefined }).optional(),
  twelfthMarksheet: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Twelfth marksheet must be string' : undefined }).optional(),
  twelfthPercentage: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Twelfth percentage must be string' : undefined }).optional(),
  diplomaCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Diploma certificate must be string' : undefined }).optional(),
  diplomaCgpa: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Diploma CGPA must be string' : undefined }).optional(),
  graduationCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Graduation certificate must be string' : undefined }).optional(),
  graduationCgpa: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Graduation CGPA must be string' : undefined }).optional(),
  postGradCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Post grad certificate must be string' : undefined }).optional(),
  postGradCgpa: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Post grad CGPA must be string' : undefined }).optional(),
  phdCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'PhD certificate must be string' : undefined }).optional(),
  phdCgpa: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'PhD CGPA must be string' : undefined }).optional(),
  clcCertificate: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'CLC certificate must be string' : undefined }).optional(),
  appointmentLetter: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Appointment letter must be string' : undefined }).optional(),
  guardianOccupation: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Guardian occupation must be string' : undefined }).optional(),
  guardianLoanAmount: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Guardian loan amount must be string' : undefined }).optional(),
  occupationDescription: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Occupation description must be string' : undefined }).optional(),
  accountHolderName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Account holder name must be string' : undefined }).optional(),
  bankName: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank name must be string' : undefined }).optional(),
  accountNumber: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Account number must be string' : undefined }).optional(),
  ifsc: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'IFSC must be string' : undefined }).optional(),
  purpose: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Purpose must be string' : undefined }).optional(),
  // All file fields (store S3 key as string)
  photoFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Photo file must be string' : undefined }).optional(),
  aadharFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Aadhaar file must be string' : undefined }).optional(),
  panFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'PAN file must be string' : undefined }).optional(),
  bankStatementFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank statement file must be string' : undefined }).optional(),
  salarySlipFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Salary slip file must be string' : undefined }).optional(),
  gstFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'GST file must be string' : undefined }).optional(),
  msmeFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'MSME file must be string' : undefined }).optional(),
  electricityBillFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Electricity bill file must be string' : undefined }).optional(),
  rentAgreementFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Rent agreement file must be string' : undefined }).optional(),
  companyPanFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company PAN file must be string' : undefined }).optional(),
  companyTanFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Company TAN file must be string' : undefined }).optional(),
  cinFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'CIN file must be string' : undefined }).optional(),
  tradeLicenseFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Trade license file must be string' : undefined }).optional(),
  foodLicenseFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Food license file must be string' : undefined }).optional(),
  drugLicenseFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Drug license file must be string' : undefined }).optional(),
  bankStatementsCurrentYear1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank statement (current year) must be string' : undefined }).optional(),
  bankStatementsCCYear1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Bank statement (CC year) must be string' : undefined }).optional(),
  deedagreementFile: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Deed agreement file must be string' : undefined }).optional(),
  itr1File: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 1 file must be string' : undefined }).optional(),
  itr2File: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 2 file must be string' : undefined }).optional(),
  itr3File: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'ITR 3 file must be string' : undefined }).optional(),
  computationFile1: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation file 1 must be string' : undefined }).optional(),
  computationFile2: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation file 2 must be string' : undefined }).optional(),
  computationFile3: z.string({ error: issue => issue.input === undefined ? undefined : issue.code === 'invalid_type' ? 'Computation file 3 must be string' : undefined }).optional(),
})
.refine(
  data => data.maritalStatus !== 'Married' || (data.spouseName?.trim() !== ''),
  { message: 'Spouse name is required for married applicants', path: ['spouseName'] }
)
.refine(
  data => data.maritalStatus !== 'Married' || (/^\d+$/.test(data.childrenCount?.trim() || '')),
  { message: 'Children count is required for married applicants', path: ['childrenCount'] }
)
.refine(
  data => data.organizationType !== 'partnership' || (data.deedagreementFile?.trim() !== ''),
  { message: 'Partnership deed agreement is required for partnership organizations', path: ['deedagreementFile'] }
)
.refine(
  data => data.businessType !== 'Rented' || (data.rentAgreementFile?.trim() !== ''),
  { message: 'Rent agreement is required for rented business type', path: ['rentAgreementFile'] }
);

module.exports = educationLoanSchema;