

const personalLoanApplicationEmailTemplate = require('../emailTemplates/personalLoanApplicationEmailTemplate');
const applyForPersonalLoanSchema = require('../schemas/loanSchemas/applyForPersonalLoanSchema');

const businessLoanApplicationEmailTemplate = require('../emailTemplates/businessLoanApplicationEmailTemplate');
const applyForBusinessLoanSchema = require('../schemas/loanSchemas/applyForBusinessLoanSchema');

const educationLoanApplicationEmailTemplate = require('../emailTemplates/educationLoanApplicationEmailTemplate');
const applyForEducationLoanSchema = require('../schemas/loanSchemas/applyForEducationLoanSchema');

const homeLoanApplicationEmailTemplate = require('../emailTemplates/homeLoanApplicationEmailTemplate');
const applyForHomeLoanSchema = require('../schemas/loanSchemas/applyForHomeLoanSchema');

const mortgageLoanApplicationEmailTemplate = require('../emailTemplates/mortgageLoanApplicationEmailTemplate');
const applyForMortgageLoanSchema = require('../schemas/loanSchemas/applyForMortgageLoanSchema');

const tractorLoanApplicationEmailTemplate = require('../emailTemplates/tractorLoanApplicationEmailTemplate');
const applyForTractorLoanSchema = require('../schemas/loanSchemas/applyForTractorLoanSchema');

const usedCarLoanApplicationEmailTemplate = require('../emailTemplates/usedCarLoanApplicationEmailTemplate');
const applyForUsedCarLoanSchema = require('../schemas/loanSchemas/applyForUsedCarLoanSchema');


const applyForPersonalLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForPersonalLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await personalLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Personal loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for personal loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForBusinessLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForBusinessLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await businessLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Business loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for business loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForEducationLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForEducationLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await educationLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Education loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for education loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForHomeLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForHomeLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await homeLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Home loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for home loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForMortgageLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForMortgageLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await mortgageLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Mortgage loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for mortgage loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForTractorLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForTractorLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await tractorLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Tractor loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for tractor loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForUsedCarLoan = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForUsedCarLoanSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await usedCarLoanApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Used car loan application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for used car loan:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports = {
    applyForPersonalLoan,
    applyForBusinessLoan,
    applyForEducationLoan,
    applyForHomeLoan,
    applyForMortgageLoan,
    applyForTractorLoan,
    applyForUsedCarLoan
};