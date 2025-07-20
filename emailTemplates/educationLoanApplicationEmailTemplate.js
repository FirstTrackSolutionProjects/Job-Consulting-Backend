const { contactTransporter } = require('../utils/emailServices');

const BUCKET_URL = process.env.S3_BUCKET_URL;

/**
 * Generates an HTML email template for internal authority notification of an Education Loan application.
 * Conditionally renders fields based on schema refinements.
 */
const generateEmailHTMLTemplate = (data) => {
  const {
    title, fullName, email, stdCode, phone, altStdCode, altPhone,
    dob, gender, maritalStatus, spouseName, childrenCount,
    fatherName, motherName, permanentAddress, presentAddress,
    pincode, city, state, country,
    aadhar, pan,
    studentName, courseName, institutionName, duration,
    loanAmount,
    guardianName, guardianStdCode, guardianPhone, guardianRelation,
    highestQualification,
    tenthCertificate, tenthMarksheet, tenthPercentage,
    twelfthCertificate, twelfthMarksheet, twelfthPercentage,
    diplomaCertificate, diplomaCgpa,
    graduationCertificate, graduationCgpa,
    postGradCertificate, postGradCgpa,
    phdCertificate, phdCgpa,
    clcCertificate, appointmentLetter,
    photoFile, aadharFile, panFile,
    bankStatementFile, salarySlipFile
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
    <h2>Education Loan Application</h2>
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
        ${row('Present Address', `${presentAddress}, ${city}, ${state} - ${pincode}, ${country}`)}
        ${row('Permanent Address', permanentAddress)}
        ${row('Aadhaar Number', aadhar)}
        ${row('PAN Number', pan)}

        <tr><td colspan="2"><strong>Academic Details</strong></td></tr>
        ${row('Student Name', studentName)}
        ${row('Course Name', courseName)}
        ${row('Institution Name', institutionName)}
        ${row('Duration (years)', duration)}
        ${row('Highest Qualification', highestQualification)}

        <tr><td colspan="2"><strong>Guardian Details</strong></td></tr>
        ${row('Guardian Name', guardianName)}
        ${row('Guardian Relation', guardianRelation)}
        ${row('Guardian Phone', `${guardianStdCode} ${guardianPhone}`)}

        <tr><td colspan="2"><strong>Loan Details</strong></td></tr>
        ${row('Loan Amount', `₹${loanAmount}`)}

        <tr><td colspan="2"><strong>Education Documents</strong></td></tr>
        ${row('Photo', photoFile, true)}
        ${row('Aadhaar File', aadharFile, true)}
        ${row('PAN File', panFile, true)}
        ${row('Bank Statement', bankStatementFile, true)}
        ${row('Salary Slip', salarySlipFile, true)}
        ${row('10th Certificate', tenthCertificate, true)}
        ${row('10th Marksheet', tenthMarksheet, true)}
        ${row('10th Percentage', tenthPercentage)}
        ${row('12th Certificate', twelfthCertificate, true)}
        ${row('12th Marksheet', twelfthMarksheet, true)}
        ${row('12th Percentage', twelfthPercentage)}
        ${row('Diploma Certificate', diplomaCertificate, true)}
        ${row('Diploma CGPA', diplomaCgpa)}
        ${row('Graduation Certificate', graduationCertificate, true)}
        ${row('Graduation CGPA', graduationCgpa)}
        ${row('Postgrad Certificate', postGradCertificate, true)}
        ${row('Postgrad CGPA', postGradCgpa)}
        ${row('PhD Certificate', phdCertificate, true)}
        ${row('PhD CGPA', phdCgpa)}
        ${row('CLC Certificate', clcCertificate, true)}
        ${row('Appointment Letter', appointmentLetter, true)}
      </tbody>
    </table>
  </div>
  `;
};

const educationLoanApplicationEmailTemplate = async (data) => {
  try {
    const mailOptions = {
      from: process.env.CONTACT_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `Education Loan Application from ${data.fullName}`,
      html: generateEmailHTMLTemplate(data),
    };
    await contactTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error generating education loan application email template:', error);
    throw new Error('Failed to send education loan application email');
  }
};

module.exports = educationLoanApplicationEmailTemplate;
