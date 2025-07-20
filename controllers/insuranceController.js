const insuranceApplicationEmailTemplate = require('../emailTemplates/insuranceApplicationEmailTemplate');
const applyForInsuranceSchema = require('../schemas/applyForInsuranceSchema');

const applyForInsurance = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForInsuranceSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await insuranceApplicationEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Insurance application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for insurance:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports = {
    applyForInsurance
}