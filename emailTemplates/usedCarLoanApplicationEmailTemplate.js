const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of a Used Car Loan application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount,
    fatherName, motherName, residence,
    presentAddress, landmark, city, state, pincode, country,
    permanentAddress, aadhar, pan,
    profession, professionType,
    // Business fields
    organizationType, businessType, industry, businessName, businessYears, businessannualturnover,
    businessAddress, businessCity, businessState, businessPincode, businessCountry,
    // Service fields
    companyName, jobYears, monthlyIncome,
    officeAddress, officeCity, officeState, officePincode, officeCountry,
    // Car details
    carModel, carYear, carPrice,
    loanAmount, purpose,
    // Bank details
    accountHolderName, bankName, accountNumber, ifsc,
    // Basic files
    photo, aadharFile, panFile, bankProof, quotations, incomeproof,
    // Business files
    gst, msme, cin, companypan, companytan, electricityBill,
    rentagreement, tradeLicense, foodLicense, drugLicense,
    bankStatementsCurrentYear1, bankStatementsCCYear1, bankStatementsCurrent,
    deedagreement, itr1, itr2, itr3, computation1, computation2, computation3
  } = data;

  const row = (label, value, isFile = false) => {
    if (!value || value.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href="${BUCKET_URL}${value}" target="_blank">View File</a></td></tr>`;
    }
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
  };

  // Business section rendering
  const renderBusinessDetails = () => {
    if (profession !== 'Business') return '';
    return `
      <tr><td colspan="2"><strong>Business Details</strong></td></tr>
      ${row('Profession Type', professionType)}
      ${row('Organization Type', organizationType)}
      ${row('Business Type', businessType)}
      ${row('Industry', industry)}
      ${row('Business Name', businessName)}
      ${row('Years in Business', businessYears)}
      ${row('Annual Turnover', `₹${businessannualturnover}`)}
      ${row('Business Address', `${businessAddress}, ${businessCity}, ${businessState} - ${businessPincode}, ${businessCountry}`)}
    `;
  };

  // Service section rendering
  const renderServiceDetails = () => {
    if (profession !== 'Service') return '';
    return `
      <tr><td colspan="2"><strong>Service Details</strong></td></tr>
      ${row('Profession Type', professionType)}
      ${row('Company Name', companyName)}
      ${row('Years in Job', jobYears)}
      ${row('Monthly Income', `₹${monthlyIncome}`)}
      ${row('Office Address', `${officeAddress}, ${officeCity}, ${officeState} - ${officePincode}, ${officeCountry}`)}
    `;
  };

  // Business-specific files
  const renderBusinessFiles = () => {
    if (profession !== 'Business') return '';
    
    let businessFiles = `
      ${row('GST Certificate', gst, true)}
      ${row('MSME Certificate', msme, true)}
      ${row('CIN', cin, true)}
      ${row('Company PAN', companypan, true)}
      ${row('Company TAN', companytan, true)}
      ${row('Electricity Bill', electricityBill, true)}
      ${row('Trade License', tradeLicense, true)}
      ${row('Food License', foodLicense, true)}
      ${row('Drug License', drugLicense, true)}
      ${row('Bank Statement (Current)', bankStatementsCurrent, true)}
      ${row('Bank Statement (Current Year)', bankStatementsCurrentYear1, true)}
      ${row('Bank Statement (CC Year)', bankStatementsCCYear1, true)}
      ${row('ITR Year 1', itr1, true)}
      ${row('ITR Year 2', itr2, true)}
      ${row('ITR Year 3', itr3, true)}
      ${row('Computation Year 1', computation1, true)}
      ${row('Computation Year 2', computation2, true)}
      ${row('Computation Year 3', computation3, true)}
    `;

    // Conditional files based on business type and organization type
    if (businessType === 'rented') {
      businessFiles += `${row('Rent Agreement', rentagreement, true)}`;
    }

    if (organizationType === 'partnership') {
      businessFiles += `${row('Partnership Deed Agreement', deedagreement, true)}`;
    }

    return businessFiles;
  };

  // Service-specific files
  const renderServiceFiles = () => {
    if (profession !== 'Service') return '';
    return `${row('Income Proof', incomeproof, true)}`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Used Car Loan Application</h2>
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
        ${row('Present Address', `${presentAddress}, ${landmark ? landmark + ', ' : ''}${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}

        <tr><td colspan="2"><strong>KYC Details</strong></td></tr>
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Professional Details</strong></td></tr>
        ${row('Profession', profession)}
        ${renderBusinessDetails()}
        ${renderServiceDetails()}

        <tr><td colspan="2"><strong>Vehicle Details</strong></td></tr>
        ${row('Car Model', carModel)}
        ${row('Car Year', carYear)}
        ${row('Car Price', `₹${carPrice}`)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Bank Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}

        <tr><td colspan="2"><strong>Basic Documents</strong></td></tr>
        ${row('Photo', photo, true)}
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Bank Proof', bankProof, true)}
        ${row('Car Quotations', quotations, true)}

        <tr><td colspan="2"><strong>Professional Documents</strong></td></tr>
        ${renderBusinessFiles()}
        ${renderServiceFiles()}
      </tbody>
    </table>
  </div>
  `;
};

const usedCarLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Used Car Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating used car loan application email template:', error);
    throw new Error('Failed to send used car loan application email');
  }
};

module.exports = usedCarLoanApplicationEmailTemplate;