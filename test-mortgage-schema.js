const schema = require('./schemas/loanSchemas/applyForMortgageLoanSchema.js');

console.log('✅ Mortgage loan schema imported successfully');

// Test basic validation
const testData = {
  title: 'Mr',
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  stdCode: '+91',
  dob: '1990-01-01',
  gender: 'Male',
  residence: 'Own',
  presentAddress: '123 Main Street',
  landmark: 'Near Park',
  city: 'Mumbai',
  state: 'Maharashtra',
  pincode: '400001',
  country: 'India',
  sameAsPresentAddress: true,
  fatherName: 'John Sr',
  motherName: 'Jane Doe',
  maritalStatus: 'Unmarried',
  aadhaar: '123456789012',
  pan: 'ABCDE1234F',
  profession: 'Service',
  professionType: 'Private Job',
  companyName: 'Tech Corp',
  jobYears: 2,
  monthlyIncome: 50000,
  officeAddress: '456 Office Street',
  officeCity: 'Mumbai',
  officeState: 'Maharashtra',
  officePincode: '400002',
  officeCountry: 'India',
  mortgageProperty: 'Apartment',
  propertyValue: 5000000,
  loanAmount: 4000000,
  purpose: 'Purchase of property for investment',
  accountHolderName: 'John Doe',
  bankName: 'SBI',
  accountNumber: '12345678901',
  ifsc: 'SBIN0001234'
};

try {
  const result = schema.parse(testData);
  console.log('✅ Basic validation passed');
} catch (error) {
  console.log('❌ Validation failed:');
  if (error.errors) {
    error.errors.forEach(err => {
      console.log(`  - ${err.path.join('.')}: ${err.message}`);
    });
  } else {
    console.log('  Error:', error.message);
  }
}

console.log('Test completed');
