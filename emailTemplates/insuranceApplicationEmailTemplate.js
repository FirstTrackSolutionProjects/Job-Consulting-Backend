const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of an Insurance application.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    fullName, dob, email, phone, gender, address,
    insuranceType, nomineeName, nomineeRelation,
    idProof, photo
  } = data;

  const row = (label, value, isFile = false) => {
    if (!value || value.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href=\"${BUCKET_URL}${value}\" target=\"_blank\">View File</a></td></tr>`;
    }
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
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

        <tr><td colspan=\"2\"><strong>Documents</strong></td></tr>
        ${row('ID Proof', idProof, true)}
        ${row('Applicant Photo', photo, true)}
      </tbody>
    </table>
  </div>
  `;
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
