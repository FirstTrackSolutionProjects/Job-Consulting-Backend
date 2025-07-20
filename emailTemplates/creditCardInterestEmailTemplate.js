const { contactTransporter } = require('../utils/emailServices');

/**
 * Generates an HTML email template for internal notification of Credit Card interest sign-ups.
 * This feature is in beta; applicants are only registering interest.
 */
const generateEmailHTMLTemplate = (data) => {
  const { name, email, phone, message } = data;

  const row = (label, value) => {
    if (!value || value.toString().trim() === '') return '';
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Credit Card Interest Registration</h2>
    <p>The following user has expressed interest in our upcoming Credit Card product:</p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        ${row('Full Name', name)}
        ${row('Email', email)}
        ${row('Phone', phone)}
        ${row('Message', message)}
      </tbody>
    </table>
    <p>Please follow up with this user once the feature is live.</p>
  </div>
  `;
};

const creditCardInterestEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Credit Card Interest: ${data.name}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating credit card interest email template:', error);
    throw new Error('Failed to send credit card interest email');
  }
};

module.exports = creditCardInterestEmailTemplate;
