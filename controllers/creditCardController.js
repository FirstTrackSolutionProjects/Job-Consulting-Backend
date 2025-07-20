const creditCardInterestEmailTemplate = require('../emailTemplates/creditCardInterestEmailTemplate');
const applyForCreditCardSchema = require('../schemas/applyForCreditCardSchema');

const applyForCreditCard = async (req, res) => {
    try {
        const body = req.body;
        const result = applyForCreditCardSchema.safeParse(body);
        if (!result.success) {
            const zodErrors = JSON.parse(result.error) || [];
            return res.status(400).json({
                message: zodErrors?.[0]?.message || 'Validation failed',
                errors: zodErrors
            });
        }
        const validatedData = result.data;
        await creditCardInterestEmailTemplate(validatedData);
        res.status(200).json({
            message: 'Credit Card application submitted successfully',
            success: true
        });
    } catch (error) {
        console.error('Error applying for credit card:', error);
        res.status(500).json({ message: error.message || 'Internal server error' });
    }
};

module.exports = {
    applyForCreditCard
}