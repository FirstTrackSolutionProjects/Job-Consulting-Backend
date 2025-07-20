const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of a Business Associate application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount,
    fatherName, motherName, residence,
    presentAddress, landmark, city, state, pincode, country,
    permanentAddress, aadhar, pan,
    interestedField, organizationType, industry,
    businessName, businessType, turnover, experience, proposal,
    loanAmount,
    accountHolderName, bankName, accountNumber, ifsc, bankProof, cancelledCheque,
    photo, officePhotos,
    aadharFile, panFile, gst, msme, rentAgreement, electricityBill,
    cin, companyPan, companyTan, tradeLicense, deedagreement,
    itr1, itr2, itr3, computation1, computation2, computation3
  } = data;

  const row = (label, value, isFile = false) => {
    if (!value || value.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href="${BUCKET_URL}${value}" target="_blank">View File</a></td></tr>`;
    }
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Business Associate Application</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        ${row('Applicant Name', `${title} ${fullName}`)}
        ${row('Email', email)}
        ${row('Phone', `${stdCode} ${phone}`)}
        ${row('Alternate Phone', `${altStdCode || ''} ${altPhone || ''}`)}
        ${row('Date of Birth', dob)}
        ${row('Gender', gender)}
        ${row('Marital Status', maritalStatus)}
        ${maritalStatus === 'Married' ? row('Spouse Name', spouseName) : ''}
        ${maritalStatus === 'Married' ? row('Children Count', childrenCount) : ''}
        ${row("Father's Name", fatherName)}
        ${row("Mother's Name", motherName)}
        ${row('Residence Type', residence)}
        ${row('Present Address', `${presentAddress}, ${landmark || ''}, ${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Business Associate Details</strong></td></tr>
        ${row('Interested Field', interestedField)}
        ${row('Organization Type', organizationType)}
        ${row('Industry', industry)}
        ${row('Business Name', businessName)}
        ${row('Business Type', businessType)}
        ${row('Annual Turnover', turnover)}
        ${row('Experience', experience)}
        ${row('Proposal', proposal, true)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount', `₹${loanAmount}`)}

        <tr><td colspan="2"><strong>Bank & Account Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}
        ${row('Bank Proof', bankProof, true)}
        ${row('Cancelled Cheque', cancelledCheque, true)}

        <tr><td colspan="2"><strong>Office & Photos</strong></td></tr>
        ${row('Office Photos', officePhotos, true)}
        ${row('Applicant Photo', photo, true)}

        <tr><td colspan="2"><strong>Uploaded Files</strong></td></tr>
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('GST File', gst, true)}
        ${row('MSME File', msme, true)}
        ${row('Rent Agreement', rentAgreement, true)}
        ${row('Electricity Bill', electricityBill, true)}
        ${row('CIN', cin, true)}
        ${row('Company PAN', companyPan, true)}
        ${row('Company TAN', companyTan, true)}
        ${row('Trade License', tradeLicense, true)}
        ${row('Partnership Deed', deedagreement, true)}
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

const businessAssociateApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Business Associate Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating Business Associate application email template:', error);
    throw new Error('Failed to send Business Associate application email');
  }
};

module.exports = businessAssociateApplicationEmailTemplate;
