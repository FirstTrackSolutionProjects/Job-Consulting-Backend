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
    aadhaar, pan,
    // Academic details
    studentName, courseName, institutionName, duration,
    loanAmount, purpose,
    // Guardian details
    guardianName, guardianStdCode, guardianPhone, guardianRelation, guardianOccupation,
    
    // Business fields
    organizationType, businessType, industry, businessName, businessYears, businessannualTurnover,
    businessAddress, businessCity, businessState, businessPincode, businessCountry,
    
    // Service fields  
    companyName, designation, experience, monthlyIncome,
    officeAddress, officeCity, officeState, officePincode, officeCountry,
    
    // Bank details
    accountHolderName, bankName, accountNumber, ifsc,
    
    // Academic qualifications
    highestQualification, twelthStream, twelfthCollege, twelfthUniversity, twelfthPercent,
    twelthCertificate, twelthMarksheet,
    twelthclcCertificate,  graduationStream, graduationCollege, graduationUniversity, graduationCgpa,
    graduationCertificate, graduationclcCertificate,
     postGradStream, postGradCollege, postGradUniversity, postGradCgpa,
     postGradCertificate, postGradclcCertificate,

    // Basic document files
    photo, aadhaarFile, panFile, bankProof, incomeProof,
    
    // Guardian files
    guardianphoto, guardianaadhaar, guardianpan,
    
    // Business files
    gst, msme, electricityBill, rentagreement,
    companyPan, companyTan, cin, tradeLicense,
    foodLicense, drugLicense, bankStatementsCurrent,
    deedagreement,
    itr1, itr2, itr3,
    computation1, computation2, computation3,

    
 
  
    
    // Other occupation files
    // loanAmountFile
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
      ${row('Annual Turnover', `₹${businessannualTurnover}`)}
      ${row('Business Address', `${businessAddress}, ${businessCity}, ${businessState} - ${businessPincode}, ${businessCountry}`)}
    `;
  };

  const renderServiceDetails = () => {
    if (guardianOccupation !== 'Service') return '';
    return `
      <tr><td colspan="2"><strong>Service Details</strong></td></tr>
      ${row('Company/Organization', companyName)}
      ${row('Designation', designation)}
      ${row('Years in Job', experience)}
      ${row('Monthly Income', `₹${monthlyIncome}`)}
      ${row('Office Address', `${officeAddress}, ${officeCity}, ${officeState} - ${officePincode}, ${officeCountry}`)}
    `;
  };

  

  // Academic qualification files based on highest qualification
  const renderAcademicFiles = () => {
    if (!highestQualification) return '';
   
    let academicFiles = '';
    if (highestQualification === '12th') {
      academicFiles += `
        ${row('12th Stream', twelthStream)}
        ${row('12th College', twelfthCollege)}
        ${row('12th University', twelfthUniversity)}
        ${row('12th Percentage', `${twelfthPercent}%`)}
        ${row('12th Certificate', twelthCertificate, true)}
        ${row('12th Marksheet', twelthMarksheet, true)}
        ${row('12th CLC Certificate', twelthclcCertificate, true)}
      `;
  }
    if (highestQualification === 'Graduate') {
      academicFiles += `
        ${row('Graduation Stream', graduationStream)}
        ${row('Graduation College', graduationCollege)}
        ${row('Graduation University', graduationUniversity)}
        ${row('Graduation CGPA', graduationCgpa)}
        ${row('Graduation Certificate', graduationCertificate, true)}
        ${row('Graduation CLC Certificate', graduationclcCertificate, true)}
      `;
    }
    if (highestQualification === 'Post Graduate') {
      academicFiles += `
        ${row('Post Graduate Stream', postGradStream)}
        ${row('Post Graduate College', postGradCollege)}
        ${row('Post Graduate University', postGradUniversity)}
        ${row('Post Graduate CGPA', postGradCgpa)}
        ${row('Post Graduate Certificate', postGradCertificate, true)}
        ${row('Post Graduate CLC Certificate', postGradclcCertificate, true)}
      `;
    }

    return academicFiles;
  };

  // Guardian occupation-specific files
  const renderBusinessFiles = () => {
    if (guardianOccupation !== 'Business') return '';
    
    let businessFiles = `
      ${row('GST Certificate', gst, true)}
      ${row('MSME/Udyam Certificate', msme, true)}
      ${row('Electricity Bill', electricityBill, true)}
      ${row('ITR 1', itr1, true)}
      ${row('ITR 2', itr2, true)}
      ${row('ITR 3', itr3, true)}
      ${row('Computation 1', computation1, true)}
      ${row('Computation 2', computation2, true)}
      ${row('Computation 3', computation3, true)}
    `;

    if (businessType === 'Rented') {
      businessFiles += `${row('Rent Agreement', rentagreement, true)}`;
    }

    if (organizationType === 'Private Limited') {
      businessFiles += `
        ${row('Company PAN', companyPan, true)}
        ${row('Company TAN', companyTan, true)}
        ${row('CIN', cin, true)}
        ${row('Trade License', tradeLicense, true)}
        ${row('Food License', foodLicense, true)}
        ${row('Drug License', drugLicense, true)}
        ${row('Bank Statement (CA)', bankStatementsCurrent, true)}
      
      `;
    }

    if (organizationType === 'Partnership') {
      businessFiles += `${row('Deed Agreement', deedagreement, true)}`;
    }

    return businessFiles;
  };

  const renderServiceFiles = () => {
    if (guardianOccupation !== 'Service') return '';
    return `${row('Salary Slip (Last 3 Months)', incomeProof, true)}`;
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
        ${row('Aadhaar Number', aadhaar)}
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
     

        <tr><td colspan="2"><strong>Bank Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Basic Documents</strong></td></tr>
        ${row('Photo', photo, true)}
        ${row('Aadhaar File', aadhaarFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Bank Statement', bankProof, true)}

        <tr><td colspan="2"><strong>Academic Documents</strong></td></tr>
        ${renderAcademicFiles()}
       
       

        <tr><td colspan="2"><strong>Guardian Documents</strong></td></tr>
        ${row('Guardian Photo', guardianphoto, true)}
        ${row('Guardian Aadhaar', guardianaadhaar, true)}
        ${row('Guardian PAN', guardianpan, true)}
        
        ${renderBusinessFiles()}
        ${renderServiceFiles()}
     
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