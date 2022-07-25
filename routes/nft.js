const express = require('express');

const router = express.Router();

const nft_Controller = require('../controllers/nft');

router.post('/generate', nft_Controller.generate);

module.exports = router;