const businessAssociateEmailTemplate = require('../emailTemplates/businessAssociateEmailTemplate');
const applyForBusinessAssociateSchema = require('../schemas/partnerSchemas/applyForBusinessAssociateSchema');
const freelancerEmailTemplate = require('../emailTemplates/freelancerEmailTemplate');
const applyForFreelancerSchema = require('../schemas/partnerSchemas/applyForFreelancerSchema');

const applyForBusinessAssociate = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForBusinessAssociateSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await businessAssociateEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Business Associate application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for business associate:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

const applyForFreelancer = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForFreelancerSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await freelancerEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Freelancer application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for freelancer:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports = {
    applyForBusinessAssociate,
    applyForFreelancer
};