const express = require('express');
const { getGetSignedUrl, getPutSignedUrl } = require('../controllers/s3Controller');

const router = express.Router();

router.post('/get-url', getGetSignedUrl);
router.post('/put-url', getPutSignedUrl);

module.exports = router;