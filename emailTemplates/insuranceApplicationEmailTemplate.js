const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of an Insurance application.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    fullName, dob, email, phone, gender, address,
    insuranceType, nomineeName, nomineeRelation,
    residence,
    presentAddress, landmark, city, state, pincode, country,
    permanentAddress, profession, professionType,
    // Business fields
    organizationType, businessType, industry, businessName, businessYears, businessannualturnover,
    businessAddress, businessCity, businessState, businessPincode, businessCountry,
    // Service fields
    companyName, jobYears, monthlyIncome,
    officeAddress, officeCity, officeState, officePincode, officeCountry,
     // Bank details
    accountHolderName, bankName, accountNumber, ifsc,
    // Basic files
    photo, aadhaarFile, panFile, bankProof, incomeproof,
    // Business files
    itr1, itr2, computation1, computation2,
  } = data;

  const row = (label, value, isFile = false) => {
    if (!value || value.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href=\"${BUCKET_URL}${value}\" target=\"_blank\">View File</a></td></tr>`;
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
      ${row('ITR - Year 1', itr1, true)}
      ${row('ITR - Year 2', itr2, true)}
      ${row('Computation - Year 1', computation1, true)}
      ${row('Computation - Year 2', computation2, true)}
    `;
    // Service-specific files
  const renderServiceFiles = () => {
    if (profession !== 'Service') return '';
    return `${row('Salary Slip (Last 3 Months)', incomeproof, true)}`;
  };


  return `
  <div style=\"font-family: Arial, sans-serif; color: #333;\">
    <h2>Insurance Application</h2>
    <table border=\"1\" cellpadding=\"8\" cellspacing=\"0\" style=\"border-collapse: collapse; width: 100%;\">
      <tbody>
        ${row('Full Name', fullName)}
        ${row('Date of Birth', dob)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Gender', gender)}
        ${row('Address', address)}
        ${row('Insurance Type', insuranceType)}
        ${row('Nominee Name', nomineeName)}
        ${row('Nominee Relation', nomineeRelation)}

        <tr><td colspan="2"><strong>Address Details</strong></td></tr>
        ${row('Residence Type', residence)}
        ${row('Present Address', `${presentAddress}, ${landmark ? landmark + ', ' : ''}${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}

        <tr><td colspan="2"><strong>Professional Details</strong></td></tr>
        ${row('Profession', profession)}
        ${renderBusinessDetails()}
        ${renderServiceDetails()}

         <tr><td colspan="2"><strong>Bank Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}
        ${row('Bank Statement', bankProof, true)}

        <tr><td colspan=\"2\"><strong>Documents</strong></td></tr>
         ${row('Photo', photo, true)}
         ${row('Aadhaar Card', aadhaarFile, true)}
          ${row('PAN Card', panFile, true)}

          <tr><td colspan="2"><strong>Professional Documents</strong></td></tr>
        ${renderBusinessFiles()}
        ${renderServiceFiles()}
      </tbody>
    </table>
  </div>
  `;
};
};

const insuranceApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Insurance Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating insurance application email template:', error);
    throw new Error('Failed to send insurance application email');
  }
};

module.exports = insuranceApplicationEmailTemplate;
