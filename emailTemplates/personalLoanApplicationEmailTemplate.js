const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount, fatherName,
    motherName, residence, presentAddress, landmark, city, state,
    pincode, country, permanentAddress, aadhar, pan, income,
    employmentType, organization, designation, department, profession,
    experienceYears, experienceMonths, loanAmount, purpose,
    accountHolderName, bankName, accountNumber, ifsc, officialAddress,
    officialLandmark, officialCity, officialPincode, officialState,
    officialCountry, officialEmail, aadharFile, panFile, photo,
    bankProof, salarySlip
  } = data;

  const row = (label, value, isFile = false) => {
    if (!value || value?.toString().trim() === '') return '';
    if (isFile) {
      return `<tr><td><strong>${label}</strong></td><td><a href="${value}" target="_blank">View File</a></td></tr>`;
    }
    return `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>`;
  };

  return `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Personal Loan Application</h2>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <tbody>
        ${row('Full Name', `${title || ''} ${fullName || ''}`.trim())}
        ${row('Email', email)}
        ${row('Phone', `${stdCode || ''} ${phone || ''}`.trim())}
        ${row('Alternate Phone', `${altStdCode || ''} ${altPhone || ''}`.trim())}
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
        ${row('Employment Type', employmentType)}
        ${row('Organization', organization)}
        ${row('Designation', designation)}
        ${employmentType === 'Government' ? row('Department', department) : ''}
        ${employmentType === 'Private' ? row('Profession', profession) : ''}
        ${row('Experience', `${experienceYears} years ${experienceMonths} months`)}
        ${row('Loan Amount (INR)', loanAmount)}
        ${row('Purpose', purpose)}
        ${row('Account Holder Name', accountHolderName)}
        ${row('Bank Name', bankName)}
        ${row('Account Number', accountNumber)}
        ${row('IFSC Code', ifsc)}
        ${row('Official Email', officialEmail)}
        ${row('Official Address', `${officialAddress}, ${officialLandmark}, ${officialCity}, ${officialState} - ${officialPincode}, ${officialCountry}`)}

        ${row('Aadhaar File', `${BUCKET_URL}${aadharFile}`, true)}
        ${row('PAN File', `${BUCKET_URL}${panFile}`, true)}
        ${row('Photo', `${BUCKET_URL}${photo}`, true)}
        ${row('Bank Proof', `${BUCKET_URL}${bankProof}`, true)}
        ${row('Salary Slip', `${BUCKET_URL}${salarySlip}`, true)}
      </tbody>
    </table>
  </div>
  `;
};

const personalLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Personal Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating personal loan application email template:', error);
    throw new Error('Failed to send personal loan application email');
  }
};

module.exports = personalLoanApplicationEmailTemplate;
