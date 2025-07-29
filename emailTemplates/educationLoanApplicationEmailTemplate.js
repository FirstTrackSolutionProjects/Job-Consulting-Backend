const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of an Education Loan application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount,
    fatherName, motherName, residence, landmark, permanentAddress, presentAddress,
    pincode, city, state, country,
    aadhar, pan,
    studentName, courseName, institutionName, duration,
    loanAmount, purpose,
    guardianName, guardianStdCode, guardianPhone, guardianRelation, guardianOccupation,
    
    // Business fields
    organizationType, businessType, industry, businessName, businessYears, annualTurnover,
    businessAddress, businessCity, businessState, businessPincode, businessCountry,
    
    // Service fields  
    serviceType, designation, experience, monthlyIncome,
    officeAddress, officeCity, officeState, officePincode, officeCountry,
    
    // Other occupation
    occupationDescription, guardianLoanAmount,
    
    // Bank details
    accountHolderName, bankName, accountNumber, ifsc,
    
    // Academic qualifications
    highestQualification,
    tenthCertificate, tenthMarksheet, tenthPercent,
    twelfthCertificate, twelfthMarksheet, twelfthPercent,
    diplomaCertificate, diplomaCgpa,
    graduationCertificate, graduationCgpa,
    postGradCertificate, postGradCgpa,
    phdCertificate, phdCgpa,
    clcCertificate, appointmentLetter,
    
    // Basic document files
    photoFile, aadharFile, panFile, bankProof,
    
    // Guardian files
    guardianphotoFile, guardianaadharFile, guardianpanFile,
    
    // Business files
    gstFile, msmeFile, electricityBillFile, rentAgreementFile,
    companyPanFile, companyTanFile, cinFile, tradeLicenseFile, 
    foodLicenseFile, drugLicenseFile, bankStatementsCurrentYear1, 
    bankStatementsCCYear1, deedagreementFile,
    itr1File, itr2File, itr3File,
    computationFile1, computationFile2, computationFile3,
    
    // Service files
    salarySlipFile,
    
    // Other occupation files
    loanAmountFile
  } = data;

  const row = (label, value, isFile = false) => {
    if (!value || value.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href="${BUCKET_URL}${value}" target="_blank">View File</a></td></tr>`;
    }
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
  };

  // Guardian occupation sections
  const renderBusinessDetails = () => {
    if (guardianOccupation !== 'Business') return '';
    return `
      <tr><td colspan="2"><strong>Business Details</strong></td></tr>
      ${row('Organization Type', organizationType)}
      ${row('Business Type', businessType)}
      ${row('Industry', industry)}
      ${row('Business Name', businessName)}
      ${row('Years in Business', businessYears)}
      ${row('Annual Turnover', `₹${annualTurnover}`)}
      ${row('Business Address', `${businessAddress}, ${businessCity}, ${businessState} - ${businessPincode}, ${businessCountry}`)}
    `;
  };

  const renderServiceDetails = () => {
    if (guardianOccupation !== 'Service') return '';
    return `
      <tr><td colspan="2"><strong>Service Details</strong></td></tr>
      ${row('Service Type', serviceType)}
      ${row('Company/Organization', businessName)}
      ${row('Designation', designation)}
      ${row('Years in Job', experience)}
      ${row('Monthly Income', `₹${monthlyIncome}`)}
      ${row('Office Address', `${officeAddress}, ${officeCity}, ${officeState} - ${officePincode}, ${officeCountry}`)}
    `;
  };

  const renderOtherOccupationDetails = () => {
    if (guardianOccupation !== 'Other') return '';
    return `
      <tr><td colspan="2"><strong>Other Occupation Details</strong></td></tr>
      ${row('Occupation Description', occupationDescription)}
      ${row('Guardian Loan Amount', `₹${guardianLoanAmount}`)}
    `;
  };

  // Academic qualification files based on highest qualification
  const renderAcademicFiles = () => {
    if (!highestQualification) return '';
    
    let academicFiles = `
      ${row('10th Certificate', tenthCertificate, true)}
      ${row('10th Marksheet', tenthMarksheet, true)}
      ${row('10th Percentage', tenthPercent)}
    `;

    if (['12th', 'Diploma', 'Graduate', 'Post Graduate', 'PhD'].includes(highestQualification)) {
      academicFiles += `
        ${row('12th Certificate', twelfthCertificate, true)}
        ${row('12th Marksheet', twelfthMarksheet, true)}
        ${row('12th Percentage', twelfthPercent)}
      `;
    }

    if (['Diploma', 'Graduate', 'Post Graduate', 'PhD'].includes(highestQualification)) {
      academicFiles += `
        ${row('Diploma Certificate', diplomaCertificate, true)}
        ${row('Diploma CGPA', diplomaCgpa)}
      `;
    }

    if (['Graduate', 'Post Graduate', 'PhD'].includes(highestQualification)) {
      academicFiles += `
        ${row('Graduation Certificate', graduationCertificate, true)}
        ${row('Graduation CGPA', graduationCgpa)}
      `;
    }

    if (['Post Graduate', 'PhD'].includes(highestQualification)) {
      academicFiles += `
        ${row('Postgrad Certificate', postGradCertificate, true)}
        ${row('Postgrad CGPA', postGradCgpa)}
      `;
    }

    if (highestQualification === 'PhD') {
      academicFiles += `
        ${row('PhD Certificate', phdCertificate, true)}
        ${row('PhD CGPA', phdCgpa)}
      `;
    }

    return academicFiles;
  };

  // Guardian occupation-specific files
  const renderBusinessFiles = () => {
    if (guardianOccupation !== 'Business') return '';
    
    let businessFiles = `
      ${row('GST Certificate', gstFile, true)}
      ${row('MSME/Udyam Certificate', msmeFile, true)}
      ${row('Electricity Bill', electricityBillFile, true)}
      ${row('ITR 1', itr1File, true)}
      ${row('ITR 2', itr2File, true)}
      ${row('ITR 3', itr3File, true)}
      ${row('Computation 1', computationFile1, true)}
      ${row('Computation 2', computationFile2, true)}
      ${row('Computation 3', computationFile3, true)}
    `;

    if (businessType === 'Rented') {
      businessFiles += `${row('Rent Agreement', rentAgreementFile, true)}`;
    }

    if (organizationType === 'Private Limited') {
      businessFiles += `
        ${row('Company PAN', companyPanFile, true)}
        ${row('Company TAN', companyTanFile, true)}
        ${row('CIN', cinFile, true)}
        ${row('Trade License', tradeLicenseFile, true)}
        ${row('Food License', foodLicenseFile, true)}
        ${row('Drug License', drugLicenseFile, true)}
        ${row('Bank Statement (CA)', bankStatementsCurrentYear1, true)}
        ${row('Bank Statement (CC)', bankStatementsCCYear1, true)}
      `;
    }

    if (organizationType === 'Partnership') {
      businessFiles += `${row('Deed Agreement', deedagreementFile, true)}`;
    }

    return businessFiles;
  };

  const renderServiceFiles = () => {
    if (guardianOccupation !== 'Service') return '';
    return `${row('Salary Slip (Last 3 Months)', salarySlipFile, true)}`;
  };

  const renderOtherOccupationFiles = () => {
    if (guardianOccupation !== 'Other') return '';
    return `${row('Loan Amount Proof', loanAmountFile, true)}`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Education Loan Application</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        <tr><td colspan="2"><strong>Personal Details</strong></td></tr>
        ${row('Applicant Name', `${title} ${fullName}`)}
        ${row('Email', email)}
        ${row('Phone', `${stdCode} ${phone}`)}
        ${row('Alternate Phone', altStdCode && altPhone ? `${altStdCode} ${altPhone}` : '')}
        ${row('Date of Birth', dob)}
        ${row('Gender', gender)}
        ${row('Marital Status', maritalStatus)}
        ${maritalStatus === 'Married' ? row('Spouse Name', spouseName) : ''}
        ${maritalStatus === 'Married' ? row('Children Count', childrenCount) : ''}
        ${row("Father's Name", fatherName)}
        ${row("Mother's Name", motherName)}

        <tr><td colspan="2"><strong>Address Details</strong></td></tr>
        ${row('Residence Type', residence)}
        ${row('Present Address', `${presentAddress}, ${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Landmark', landmark)}
        ${row('Permanent Address', permanentAddress)}

        <tr><td colspan="2"><strong>KYC Details</strong></td></tr>
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Academic Details</strong></td></tr>
        ${row('Student Name', studentName)}
        ${row('Course Name', courseName)}
        ${row('Institution Name', institutionName)}
        ${row('Duration (years)', duration)}
        ${row('Highest Qualification', highestQualification)}

        <tr><td colspan="2"><strong>Guardian Details</strong></td></tr>
        ${row('Guardian Name', guardianName)}
        ${row('Guardian Relation', guardianRelation)}
        ${row('Guardian Phone', `${guardianStdCode} ${guardianPhone}`)}
        ${row('Guardian Occupation', guardianOccupation)}

        ${renderBusinessDetails()}
        ${renderServiceDetails()}
        ${renderOtherOccupationDetails()}

        <tr><td colspan="2"><strong>Bank Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Basic Documents</strong></td></tr>
        ${row('Photo', photoFile, true)}
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Bank Statement', bankProof, true)}

        <tr><td colspan="2"><strong>Academic Documents</strong></td></tr>
        ${renderAcademicFiles()}
        ${row('CLC Certificate', clcCertificate, true)}
        ${row('Appointment Letter', appointmentLetter, true)}

        <tr><td colspan="2"><strong>Guardian Documents</strong></td></tr>
        ${row('Guardian Photo', guardianphotoFile, true)}
        ${row('Guardian Aadhaar', guardianaadharFile, true)}
        ${row('Guardian PAN', guardianpanFile, true)}
        
        ${renderBusinessFiles()}
        ${renderServiceFiles()}
        ${renderOtherOccupationFiles()}
      </tbody>
    </table>
  </div>
  `;
};

const educationLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Education Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating education loan application email template:', error);
    throw new Error('Failed to send education loan application email');
  }
};

module.exports = educationLoanApplicationEmailTemplate;