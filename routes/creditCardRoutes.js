const express = require('express');
const router = express.Router();

const { applyForCreditCard } = require('../controllers/creditCardController');

router.post('/apply-for-credit-card', applyForCreditCard);

module.exports = router;