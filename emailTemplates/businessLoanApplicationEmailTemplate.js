const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of a Business Loan application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount, fatherName,
    motherName, residence, presentAddress, landmark, city, state,
    pincode, country, permanentAddress, aadhar, pan,
    organizationType, industry, businessName, businessType,
    businessAddress, businessCity, businessState, businessPincode, businessCountry,
    turnover, years, loanAmount, purpose,
    accountHolderName, bankName, accountNumber, ifsc, bankProof,
    photo, officePhoto1, officePhoto2, officePhoto3, officePhoto4,
    aadharFile, panFile, rentAgreement, gst, msme, electricityBill,
    cin, companyPan, companyTan, deedagreement,
    itr1, itr2, itr3, computation1, computation2, computation3
  } = data;

  const row = (label, value, isFile = false) => {
    if (value === undefined || value === null || value.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href="${BUCKET_URL}${value}" target="_blank">View File</a></td></tr>`;
    }
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Business Loan Application</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        ${row('Full Name', `${title} ${fullName}`)}
        ${row('Email', email)}
        ${row('Phone', `${stdCode} ${phone}`)}
        ${row('Alternate Phone', `${altStdCode} ${altPhone}`)}
        ${row('Date of Birth', dob)}
        ${row('Gender', gender)}
        ${row('Marital Status', maritalStatus)}
        ${maritalStatus === 'Married' ? row('Spouse Name', spouseName) : ''}
        ${maritalStatus === 'Married' ? row('Children Count', childrenCount) : ''}
        ${row("Father's Name", fatherName)}
        ${row("Mother's Name", motherName)}
        ${row('Residence Type', residence)}
        ${row('Present Address', `${presentAddress}, ${landmark}, ${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Business Details</strong></td></tr>
        ${row('Organization Type', organizationType)}
        ${(organizationType === 'private_limited') ? row('CIN', cin) + row('Company PAN', companyPan) + row('Company TAN', companyTan) : ''}
        ${(organizationType === 'partnership') ? row('Partnership Deed', deedagreement, true) : ''}
        ${row('Industry', industry)}
        ${row('Business Name', businessName)}
        ${row('Business Type', businessType)}
        ${businessType === 'Rented' ? row('Rent Agreement', rentAgreement, true) : ''}
        ${row('Business Address', businessAddress)}
        ${row('City', businessCity)}
        ${row('State', businessState)}
        ${row('Pincode', businessPincode)}
        ${row('Country', businessCountry)}
        ${row('GST Number', gst, true)}
        ${row('MSME Reg', msme, true)}
        ${row('Electricity Bill', electricityBill, true)}

        <tr><td colspan="2"><strong>Financial & Loan Details</strong></td></tr>
        ${row('Annual Turnover', `₹${turnover}`)}
        ${row('Years in Business', years)}
        ${row('Loan Amount', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Bank Details & Documents</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}
        ${row('Bank Proof', bankProof, true)}

        <tr><td colspan="2"><strong>Uploaded Files</strong></td></tr>
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Applicant Photo', photo, true)}
        ${row('Office Photo 1', officePhoto1, true)}
        ${row('Office Photo 2', officePhoto2, true)}
        ${row('Office Photo 3', officePhoto3, true)}
        ${row('Office Photo 4', officePhoto4, true)}
        ${row('ITR Year 1', itr1, true)}
        ${row('ITR Year 2', itr2, true)}
        ${row('ITR Year 3', itr3, true)}
        ${row('Computation Year 1', computation1, true)}
        ${row('Computation Year 2', computation2, true)}
        ${row('Computation Year 3', computation3, true)}
      </tbody>
    </table>
  </div>
  `;
};

const businessLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Business Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating business loan application email template:', error);
    throw new Error('Failed to send business loan application email');
  }
};

module.exports = businessLoanApplicationEmailTemplate;
