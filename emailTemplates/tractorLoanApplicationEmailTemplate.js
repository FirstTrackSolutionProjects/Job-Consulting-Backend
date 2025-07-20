const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of a Tractor Loan application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount,
    fatherName, motherName, residence,
    presentAddress, landmark, city, state, pincode, country,
    permanentAddress, aadhar, pan,
    tractorModel, tractorPrice, landSize,
    loanAmount, purpose,
    accountHolderName, bankName, accountNumber, ifsc, bankProof,
    photo, aadharFile, panFile, quotations
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
    <h2>Tractor Loan Application</h2>
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
        ${row('Present Address', `${presentAddress}, ${landmark}, ${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Tractor & Land Details</strong></td></tr>
        ${row('Tractor Model', tractorModel)}
        ${row('Tractor Price (INR)', `₹${tractorPrice}`)}
        ${row('Land Size', landSize)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount (INR)', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Bank & Document Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}
        ${row('Bank Proof', bankProof, true)}
        ${row('Quotations', quotations, true)}

        <tr><td colspan="2"><strong>Uploaded Files</strong></td></tr>
        ${row('Applicant Photo', photo, true)}
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
      </tbody>
    </table>
  </div>
  `;
};

const tractorLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Tractor Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating tractor loan application email template:', error);
    throw new Error('Failed to send tractor loan application email');
  }
};

module.exports = tractorLoanApplicationEmailTemplate;
