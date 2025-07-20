const express = require('express');
const router = express.Router();

const { applyForBusinessAssociate, applyForFreelancer } = require('../controllers/partnerController');

router.post('/apply-for-business-associate', applyForBusinessAssociate);
router.post('/apply-for-freelancer', applyForFreelancer);

module.exports = router;