const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal notification of Credit Card applications.
 * Conditionally renders fields based on profession type and file uploads.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    name, email, phone, stdCode, profession, message,
    // Business fields
    businessName, yearsInBusiness,
    // Service fields
    companyName,
    // File fields
    photo, aadhaar, pan, salaryslip, itr1, itr2, computation1, computation2
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
      ${row('Business Name', businessName)}
      ${row('Years in Business', yearsInBusiness)}
    `;
  };

  // Service section rendering
  const renderServiceDetails = () => {
    if (profession !== 'Service') return '';
    return `
      <tr><td colspan="2"><strong>Service Details</strong></td></tr>
      ${row('Company Name', companyName)}
    `;
  };

  // Business-specific files
  const renderBusinessFiles = () => {
    if (profession !== 'Business') return '';
    return `
      ${row('ITR Year 1', itr1, true)}
      ${row('ITR Year 2', itr2, true)}
      ${row('Computation Year 1', computation1, true)}
      ${row('Computation Year 2', computation2, true)}
    `;
  };

  // Service-specific files
  const renderServiceFiles = () => {
    if (profession !== 'Service') return '';
    return `${row('Salary Slip', salaryslip, true)}`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Credit Card Application</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        <tr><td colspan="2"><strong>Personal Details</strong></td></tr>
        ${row('Full Name', name)}
        ${row('Email', email)}
        ${row('Phone', `${stdCode} ${phone}`)}
        ${row('Profession', profession)}

        ${renderBusinessDetails()}
        ${renderServiceDetails()}

        <tr><td colspan="2"><strong>Basic Documents</strong></td></tr>
        ${row('Photo', photo, true)}
        ${row('Aadhaar', aadhaar, true)}
        ${row('PAN', pan, true)}

        <tr><td colspan="2"><strong>Professional Documents</strong></td></tr>
        ${renderBusinessFiles()}
        ${renderServiceFiles()}

        ${message ? `<tr><td colspan="2"><strong>Additional Message</strong></td></tr>` : ''}
        ${row('Message', message)}
      </tbody>
    </table>
  </div>
  `;
};

const creditCardInterestEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Credit Card Application from ${data.name}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating credit card application email template:', error);
    throw new Error('Failed to send credit card application email');
  }
};

module.exports = creditCardInterestEmailTemplate;