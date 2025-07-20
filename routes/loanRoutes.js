const express = require('express');
const {
  applyForPersonalLoan,
  applyForBusinessLoan,
  applyForEducationLoan,
  applyForHomeLoan,
  applyForMortgageLoan,
  applyForTractorLoan,
  applyForUsedCarLoan
} = require('../controllers/loanController');
const router = express.Router();


router.post('/apply-for-personal-loan', applyForPersonalLoan);
router.post('/apply-for-business-loan', applyForBusinessLoan);
router.post('/apply-for-education-loan', applyForEducationLoan);
router.post('/apply-for-home-loan', applyForHomeLoan);
router.post('/apply-for-mortgage-loan', applyForMortgageLoan);
router.post('/apply-for-tractor-loan', applyForTractorLoan);
router.post('/apply-for-used-car-loan', applyForUsedCarLoan);

module.exports = router;