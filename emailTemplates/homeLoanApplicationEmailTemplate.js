const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of a Home Loan application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount,
    fatherName, motherName, residence, presentAddress, landmark,
    city, state, pincode, country, permanentAddress,
    aadhar, pan, income, location, propertyValue,
    loanAmount, purpose,
    profession, professionType, organizationType,
    businessType, businessName, businessYears, businessannualturnover,
    businessAddress, businessCity, businessState, businessPincode, businessCountry,
    companyName, jobYears, officeAddress, officeCity, officeState, officePincode, officeCountry,
    photo, aadharFile, panFile, bankProof, rentagreement,
    electricityBill, tradeLicense, foodLicense, drugLicense,
    cin, companypan, companytan, gst, msme,
    bankStatementsCurrentYear1, bankStatementsCCYear1,
    itr1, itr2, itr3, computation1, computation2, computation3, monthlyIncome
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
    <h2>Home Loan Application</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        ${row('Full Name', `${title} ${fullName}`)}
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
        ${row('Monthly Income (INR)', income)}

        <tr><td colspan="2"><strong>Property Details</strong></td></tr>
        ${row('Location', location)}
        ${row('Property Value (INR)', `₹${propertyValue}`)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount (INR)', `₹${loanAmount}`)}
        ${row('Purpose', purpose)}

        <tr><td colspan="2"><strong>Professional Details</strong></td></tr>
        ${row('Profession', profession)}
        ${profession === 'Business' ? row('Profession Type', professionType) : ''}
        ${profession === 'Business' ? row('Organization Type', organizationType) : ''}
        ${profession === 'Business' ? row('Business Type', businessType) : ''}
        ${profession === 'Business' ? row('Business Name', businessName) : ''}
        ${profession === 'Business' ? row('Business Years', businessYears) : ''}
        ${profession === 'Business' ? row('Annual Turnover', businessannualturnover) : ''}
        ${profession === 'Business' ? row('Business Address', businessAddress) : ''}
        ${profession === 'Business' ? row('Business City', businessCity) : ''}
        ${profession === 'Business' ? row('Business State', businessState) : ''}
        ${profession === 'Business' ? row('Business Pincode', businessPincode) : ''}
        ${profession === 'Business' ? row('Business Country', businessCountry) : ''}
        ${profession === 'Business' ? row('Partnership Deed', cin, true) : ''}
        ${profession === 'Business' ? row('Company PAN', companypan, true) : ''}
        ${profession === 'Business' ? row('Company TAN', companytan, true) : ''}

        <tr><td colspan="2"><strong>Service Details</strong></td></tr>
        ${profession === 'Service' ? row('Profession Type', professionType) : ''}
        ${profession === 'Service' ? row('Company Name', companyName) : ''}
        ${profession === 'Service' ? row('Job Years', jobYears) : ''}
        ${profession === 'Service' ? row('Monthly Income', monthlyIncome) : ''}
        ${profession === 'Service' ? row('Office Address', officeAddress) : ''}
        ${profession === 'Service' ? row('Office City', officeCity) : ''}
        ${profession === 'Service' ? row('Office State', officeState) : ''}
        ${profession === 'Service' ? row('Office Pincode', officePincode) : ''}
        ${profession === 'Service' ? row('Office Country', officeCountry) : ''}

        <tr><td colspan="2"><strong>Uploaded Documents</strong></td></tr>
        ${row('Photo', photo, true)}
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Bank Proof', bankProof, true)}
        ${row('Rent Agreement', rentagreement, true)}
        ${row('Electricity Bill', electricityBill, true)}
        ${row('Trade License', tradeLicense, true)}
        ${row('Food License', foodLicense, true)}
        ${row('Drug License', drugLicense, true)}
        ${row('CIN File', cin, true)}
        ${row('Company PAN File', companypan, true)}
        ${row('Company TAN File', companytan, true)}
        ${row('GST File', gst, true)}
        ${row('MSME File', msme, true)}
        ${row('Bank Statement (Current Year)', bankStatementsCurrentYear1, true)}
        ${row('Bank Statement (CC Year)', bankStatementsCCYear1, true)}
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

const homeLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Home Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating home loan application email template:', error);
    throw new Error('Failed to send home loan application email');
  }
};

module.exports = homeLoanApplicationEmailTemplate;
