const z = require('zod');

const TITLES = Object.freeze(['Mr', 'Mrs', 'Miss', 'Dr']);

const GENDERS = Object.freeze(['Male', 'Female']);

const MARITAL_STATUS = Object.freeze(['Unmarried', 'Married', 'Single']);

const RESIDENCE_OWNERSHIP_TYPES = Object.freeze(['Own', 'Rented']);

const BUSINESS_PROFESSION_TYPES = Object.freeze(['Retail/Shop/Mart', 'Manufacturing','Freelancer','IT Consulting', 'Media', 'Internet', 'Other'])

const SERVICE_PROFESSION_TYPES = Object.freeze(["Private Job", "Government Job"])

const GET_PROFESSION_TYPES = (key) => {
    const options = (key==="Business")?BUSINESS_PROFESSION_TYPES:SERVICE_PROFESSION_TYPES;
    return options;
}

const GET_PROFESSION_TYPES_VALIDATION = (key) => {
    const validations = {
        "Business": z.enum(BUSINESS_PROFESSION_TYPES, { error: 'Profession type is required' }),
        "Service": z.enum(SERVICE_PROFESSION_TYPES, { error: 'Profession type is required' }),
    }
    return validations[key];
}

const BUSINESS_ORGANIZATION_TYPES = Object.freeze(['Proprietor', 'Partnership', 'Private Limited', 'Other']);

const BUSINESS_OWNERSHIP_TYPES = Object.freeze(['Own', 'Rented']);

//////////////USED CAR LOAN ENUMS//////////////



const USED_CAR_LOAN_STD_CODES = Object.freeze(['+91']);

const USED_CAR_LOAN_COUNTRIES = Object.freeze(['India']);

const USED_CAR_LOAN_PROFESSIONS = Object.freeze(['Business', 'Service']);

////////////MORTGAGE LOAN ENUMS////////////

const MORTGAGE_LOAN_STD_CODES = Object.freeze(['+91']);

const MORTGAGE_LOAN_COUNTRIES = Object.freeze(['India']);

const MORTGAGE_LOAN_PROFESSIONS = Object.freeze(['Business', 'Service']);

///////////////HOME LOAN ENUMS////////////

const HOME_LOAN_STD_CODES = Object.freeze(['+91']);

const HOME_LOAN_COUNTRIES = Object.freeze(['India']);

const HOME_LOAN_PROFESSIONS = Object.freeze(['Business', 'Service']);

///////////////EDUCATION LOAN ENUMS////////////

const EDUCATION_LOAN_STD_CODES = Object.freeze(['+91']);

const EDUCATION_LOAN_COUNTRIES = Object.freeze(['India']);

const EDUCATION_LOAN_HIGHEST_QUALIFICATIONS = Object.freeze(['12th', 'Graduate', 'Post Graduate',]);

const EDUCATION_LOAN_TWELFTH_STREAMS = Object.freeze(['Science', 'Commerce', 'Arts']);

const EDUCATION_LOAN_GRADUATION_STREAMS = Object.freeze(['B.Sc', 'B.Com', 'B.A', 'BBA', 'B.Tech', 'Other']);

const EDUCATION_LOAN_POST_GRADUATION_STREAMS = Object.freeze(['M.Sc', 'M.Com', 'M.A', 'MBA', 'M.Tech', 'Other']);

const EDUCATION_LOAN_GUARDIAN_STD_CODES = Object.freeze(['+91']);

const EDUCATION_LOAN_GUARDIAN_RELATION= Object.freeze(['Father', 'Mother', 'Brother', 'Sister']);

const EDUCATION_LOAN_GUARDIAN_OCCUPATIONS = Object.freeze(['Business', 'Service']);

///////////////INSURANCE ENUMS////////////
// const INSURANCE_STD_CODES = Object.freeze(['+91']);

const INSURANCE_COUNTRIES = Object.freeze(['India']);

const INSURANCE_TYPES = Object.freeze(['Health Insurance', 'Life Insurance', 'Vehicle Insurance', 'Travel Insurance']);

const INSURANCE_PROFESSIONS = Object.freeze(['Business', 'Service']);

module.exports = {
    TITLES,
    GENDERS,
    MARITAL_STATUS,
    RESIDENCE_OWNERSHIP_TYPES,
    BUSINESS_PROFESSION_TYPES,
    SERVICE_PROFESSION_TYPES,
    GET_PROFESSION_TYPES,
    GET_PROFESSION_TYPES_VALIDATION,
    BUSINESS_ORGANIZATION_TYPES,
    BUSINESS_OWNERSHIP_TYPES,
    USED_CAR_LOAN_STD_CODES,
    USED_CAR_LOAN_COUNTRIES,
    USED_CAR_LOAN_PROFESSIONS,
    MORTGAGE_LOAN_STD_CODES,
    MORTGAGE_LOAN_COUNTRIES,
    MORTGAGE_LOAN_PROFESSIONS,
    HOME_LOAN_STD_CODES,
    HOME_LOAN_COUNTRIES,
    HOME_LOAN_PROFESSIONS,
    EDUCATION_LOAN_STD_CODES,
    EDUCATION_LOAN_COUNTRIES,
    EDUCATION_LOAN_HIGHEST_QUALIFICATIONS,
    EDUCATION_LOAN_TWELFTH_STREAMS,
    EDUCATION_LOAN_GRADUATION_STREAMS,
    EDUCATION_LOAN_POST_GRADUATION_STREAMS,
    EDUCATION_LOAN_GUARDIAN_STD_CODES,
    EDUCATION_LOAN_GUARDIAN_RELATION,
    EDUCATION_LOAN_GUARDIAN_OCCUPATIONS,
    INSURANCE_COUNTRIES,
    INSURANCE_TYPES,
    INSURANCE_PROFESSIONS    
}