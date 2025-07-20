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
    presentAddress, permanentAddress, state, city, pincode, country,
    aadhar, pan,
    profession, professionType,
    businessType, businessName, businessYears, businessPincode, businessCity, businessState, businessCountry,
    companyName, jobYears, officeAddress, officeCity, officePincode, officeState, officeCountry,
    carModel, carYear, carPrice,
    loanAmount, purpose,
    accountHolderName, bankName, accountNumber, ifsc,
    bankProof, photo, aadharFile, panFile, quotations, incomeproof
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
    <h2>Used Car Loan Application</h2>
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
        ${row('Present Address', `${presentAddress}, ${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Vehicle Details</strong></td></tr>
        ${row('Car Model', carModel)}
        ${row('Car Year', carYear)}
        ${row('Car Price (INR)', `₹${carPrice}`)}

        ${profession === 'Business' ? `<tr><td colspan="2"><strong>Business Details</strong></td></tr>` : ''}
        ${profession === 'Business' ? row('Business Type', businessType) : ''}
        ${profession === 'Business' ? row('Business Name', businessName) : ''}
        ${profession === 'Business' ? row('Years in Business', businessYears) : ''}
        ${profession === 'Business' ? row('Business City', businessCity) : ''}
        ${profession === 'Business' ? row('Business State', businessState) : ''}
        ${profession === 'Business' ? row('Business Country', businessCountry) : ''}
        ${profession === 'Business' ? row('Business Proof', businessProof, true) : ''}

        ${profession === 'Service' ? `<tr><td colspan="2"><strong>Service Details</strong></td></tr>` : ''}
        ${profession === 'Service' ? row('Company Name', companyName) : ''}
        ${profession === 'Service' ? row('Years Employed', jobYears) : ''}
        ${profession === 'Service' ? row('Office Address', officeAddress) : ''}
        ${profession === 'Service' ? row('Office City', officeCity) : ''}
        ${profession === 'Service' ? row('Office State', officeState) : ''}
        ${profession === 'Service' ? row('Office Country', officeCountry) : ''}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount (INR)', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Bank & Document Details</strong></td></tr>
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}
        ${row('Bank Proof', bankProof, true)}
        ${row('Income Proof', incomeproof, true)}

        <tr><td colspan="2"><strong>Uploaded Files</strong></td></tr>
        ${row('Applicant Photo', photo, true)}
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Quotations', quotations, true)}
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
