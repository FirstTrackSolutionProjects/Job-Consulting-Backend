const express = require('express');
const router = express.Router();

const { applyForInsurance } = require('../controllers/insuranceController');

router.post('/apply-for-insurance', applyForInsurance);

module.exports = router;